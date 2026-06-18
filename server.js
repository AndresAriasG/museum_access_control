const express = require("express");
const path = require("path");
const crypto = require("crypto");
const { Pool } = require("pg");

const app = express();
const distPath = path.join(__dirname, "dist");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const pool = process.env.DATABASE_URL
  ? new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false
    })
  : null;

function requireDb(_req, res, next) {
  if (!pool) {
    return res.status(503).json({ error: "DATABASE_URL is not configured" });
  }

  next();
}

function ticketCode() {
  return `MAC-${crypto.randomBytes(4).toString("hex").toUpperCase()}`;
}

function searchValue(req) {
  return String(req.query.search || "").trim();
}

app.get("/api/health", (_req, res) => {
  res.json({
    ok: true,
    service: "museum_access_control",
    database: pool ? "configured" : "missing DATABASE_URL"
  });
});

app.post("/api/access-users/init", requireDb, async (_req, res) => {
  try {
    const result = await pool.query(
      `INSERT INTO museum_auth_users (username, password_hash, first_name, last_name, role)
       VALUES ($1, $2, $3, $4, $5)
       ON CONFLICT (username) DO UPDATE
       SET is_active = true,
           role = EXCLUDED.role,
           updated_at = now()
       RETURNING id, username, first_name, last_name, role`,
      ["accesos@museo.gov", "museum2026", "Control", "Accesos", "operator"]
    );

    res.status(201).json({ user: result.rows[0] });
  } catch (error) {
    console.error("Access user init failed:", error);
    res.status(500).json({ error: "No se pudo crear el usuario de accesos" });
  }
});

app.post("/api/login", requireDb, async (req, res) => {
  const { username, password } = req.body;

  try {
    const result = await pool.query(
      `SELECT id, username, first_name, last_name, role
       FROM museum_auth_users
       WHERE username = $1 AND password_hash = $2 AND is_active = true`,
      [username, password]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ error: "Usuario o contrasena incorrectos" });
    }

    res.json({ user: result.rows[0] });
  } catch (error) {
    console.error("Login query failed:", error);
    res.status(500).json({ error: "No se pudo validar el acceso" });
  }
});

app.get("/api/rooms", requireDb, async (_req, res) => {
  try {
    const result = await pool.query(
      `SELECT id, name, capacity
       FROM museum_rooms
       WHERE is_active = true
       ORDER BY name`
    );

    res.json({ rooms: result.rows });
  } catch (error) {
    console.error("Rooms query failed:", error);
    res.status(500).json({ error: "No se pudieron cargar las salas" });
  }
});

app.post("/api/rooms", requireDb, async (req, res) => {
  const { name, capacity } = req.body;
  const cleanName = String(name || "").trim();
  const parsedCapacity = Number(capacity);

  if (!cleanName || !Number.isInteger(parsedCapacity) || parsedCapacity <= 0) {
    return res.status(400).json({ error: "Nombre y capacidad valida son obligatorios" });
  }

  try {
    const result = await pool.query(
      `INSERT INTO museum_rooms (name, capacity, is_active)
       VALUES ($1, $2, true)
       ON CONFLICT (name) DO UPDATE
       SET capacity = EXCLUDED.capacity,
           is_active = true
       RETURNING id, name, capacity, is_active`,
      [cleanName, parsedCapacity]
    );

    res.status(201).json({ room: result.rows[0] });
  } catch (error) {
    console.error("Room creation failed:", error);
    res.status(500).json({ error: "No se pudo guardar la sala" });
  }
});

app.get("/api/dashboard", requireDb, async (req, res) => {
  const search = searchValue(req);
  const recentSearch = `%${search}%`;

  try {
    const [kpis, hourly, weekly, rooms, recent, reports] = await Promise.all([
      pool.query("SELECT * FROM museum_daily_kpis LIMIT 1"),
      pool.query(
        `SELECT to_char(hour_bucket, 'HH24:00') AS label, COUNT(ae.id)::int AS value
         FROM generate_series(
           date_trunc('hour', now()) - interval '9 hours',
           date_trunc('hour', now()),
           interval '1 hour'
         ) hour_bucket
         LEFT JOIN museum_access_entries ae
           ON date_trunc('hour', ae.entered_at) = hour_bucket
         GROUP BY hour_bucket
         ORDER BY hour_bucket`
      ),
      pool.query(
        `SELECT to_char(day_bucket, 'Dy') AS label,
                to_char(day_bucket, 'YYYY-MM-DD') AS date,
                COUNT(ae.id)::int AS value
         FROM generate_series(
           CURRENT_DATE - interval '6 days',
           CURRENT_DATE,
           interval '1 day'
         ) day_bucket
         LEFT JOIN museum_access_entries ae
           ON ae.entered_at::date = day_bucket::date
         GROUP BY day_bucket
         ORDER BY day_bucket`
      ),
      pool.query(
        `SELECT r.id,
                r.name,
                r.capacity,
                COUNT(ae.id) FILTER (WHERE ae.status = 'inside')::int AS inside,
                LEAST(100, ROUND((COUNT(ae.id) FILTER (WHERE ae.status = 'inside')::numeric / r.capacity) * 100))::int AS occupancy
         FROM museum_rooms r
         LEFT JOIN museum_access_entries ae ON ae.room_id = r.id
         WHERE r.is_active = true
         GROUP BY r.id, r.name, r.capacity
         ORDER BY r.name`
      ),
      pool.query(
        `SELECT ae.id,
                v.full_name,
                v.visitor_type,
                v.country,
                v.city,
                COALESCE(r.name, 'Sin sala') AS room,
                to_char(ae.entered_at, 'HH24:MI') AS time,
                ae.status
         FROM museum_access_entries ae
         JOIN museum_visitors v ON v.id = ae.visitor_id
         LEFT JOIN museum_rooms r ON r.id = ae.room_id
         LEFT JOIN museum_qr_tickets t ON t.id = ae.ticket_id
         WHERE ($1 = ''
           OR v.full_name ILIKE $2
           OR v.visitor_type ILIKE $2
           OR v.country ILIKE $2
           OR v.city ILIKE $2
           OR r.name ILIKE $2
           OR t.ticket_code ILIKE $2
           OR ae.status ILIKE $2)
         ORDER BY ae.entered_at DESC
         LIMIT 8`,
        [search, recentSearch]
      ),
      pool.query(
        `SELECT
           COALESCE(
             (SELECT to_char(date_trunc('hour', entered_at), 'HH24:00') || ' - ' || to_char(date_trunc('hour', entered_at) + interval '1 hour', 'HH24:00')
              FROM museum_access_entries
              WHERE entered_at >= now() - interval '7 days'
              GROUP BY date_trunc('hour', entered_at)
              ORDER BY COUNT(*) DESC
              LIMIT 1),
             'Sin datos'
           ) AS peak_access,
           COALESCE(
             (SELECT r.name
              FROM museum_access_entries ae
              JOIN museum_rooms r ON r.id = ae.room_id
              WHERE ae.entered_at >= now() - interval '7 days'
              GROUP BY r.name
              ORDER BY COUNT(*) DESC
              LIMIT 1),
             'Sin datos'
           ) AS top_room,
           COALESCE(
             (SELECT COALESCE(NULLIF(v.country, ''), 'Sin pais') || ' / ' || COALESCE(NULLIF(v.city, ''), 'Sin ciudad')
              FROM museum_access_entries ae
              JOIN museum_visitors v ON v.id = ae.visitor_id
              WHERE ae.entered_at >= now() - interval '7 days'
              GROUP BY v.country, v.city
              ORDER BY COUNT(*) DESC
              LIMIT 1),
             'Sin datos'
           ) AS top_origin,
           COALESCE(
             ROUND((COUNT(*) FILTER (WHERE ticket_id IS NOT NULL)::numeric / NULLIF(COUNT(*), 0)) * 100, 1),
             0
           ) AS qr_conversion,
           COUNT(*)::int AS total_visitors
         FROM museum_access_entries
         WHERE entered_at >= now() - interval '7 days'`
      )
    ]);

    const kpiRow = kpis.rows[0] || {};
    const reportRow = reports.rows[0] || {};

    res.json({
      kpis: {
        visitorsToday: Number(kpiRow.visitors_today || 0),
        qrValidationsToday: Number(kpiRow.qr_validations_today || 0),
        visitorsInside: Number(kpiRow.visitors_inside || 0),
        totalCapacity: rooms.rows.reduce((sum, room) => sum + Number(room.capacity || 0), 0)
      },
      hourly: hourly.rows,
      weekly: weekly.rows,
      rooms: rooms.rows,
      recent: recent.rows,
      reports: {
        peakAccess: reportRow.peak_access || "Sin datos",
        topRoom: reportRow.top_room || "Sin datos",
        topOrigin: reportRow.top_origin || "Sin datos",
        qrConversion: `${Number(reportRow.qr_conversion || 0)}%`,
        totalVisitors: Number(reportRow.total_visitors || 0)
      }
    });
  } catch (error) {
    console.error("Dashboard query failed:", error);
    res.status(500).json({ error: "No se pudo cargar el dashboard" });
  }
});

app.post("/api/entries", requireDb, async (req, res) => {
  const { fullName, documentNumber, visitorType, email, country, city, roomId, validatedBy } = req.body;
  const cleanName = String(fullName || "").trim();
  const cleanEmail = String(email || "").trim();
  const requiredFields = { fullName, documentNumber, visitorType, email, country, city, roomId };
  const missingFields = Object.entries(requiredFields)
    .filter(([, value]) => !String(value || "").trim())
    .map(([key]) => key);

  if (missingFields.length > 0) {
    return res.status(400).json({ error: "Todos los campos del registro son obligatorios" });
  }

  if (!/^[\p{L}\s]+$/u.test(cleanName)) {
    return res.status(400).json({ error: "El nombre solo debe contener letras y espacios" });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
    return res.status(400).json({ error: "El email debe tener un formato valido" });
  }

  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const visitor = await client.query(
      `INSERT INTO museum_visitors (full_name, document_number, visitor_type, email, country, city)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING id, full_name, visitor_type, country, city`,
      [
        cleanName,
        documentNumber.trim(),
        visitorType.trim(),
        cleanEmail,
        country.trim(),
        city.trim()
      ]
    );

    const ticket = await client.query(
      `INSERT INTO museum_qr_tickets (ticket_code, visitor_id, valid_until, status, signature)
       VALUES ($1, $2, now() + interval '8 hours', 'active', 'QR-SHA256')
       RETURNING id, ticket_code, valid_until, status`,
      [ticketCode(), visitor.rows[0].id]
    );

    const entry = await client.query(
      `INSERT INTO museum_access_entries (visitor_id, room_id, ticket_id, status, validated_by, notes)
       VALUES ($1, $2, $3, 'inside', $4, 'Registro desde dashboard')
       RETURNING id, entered_at, status`,
      [visitor.rows[0].id, roomId, ticket.rows[0].id, validatedBy || null]
    );

    await client.query("COMMIT");

    res.status(201).json({
      visitor: visitor.rows[0],
      ticket: ticket.rows[0],
      entry: entry.rows[0]
    });
  } catch (error) {
    await client.query("ROLLBACK");
    console.error("Entry creation failed:", error);
    res.status(500).json({ error: "No se pudo registrar la entrada" });
  } finally {
    client.release();
  }
});

app.post("/api/qr/validate", requireDb, async (req, res) => {
  const { ticketCode: code } = req.body;

  if (!code) {
    return res.status(400).json({ error: "Codigo QR obligatorio" });
  }

  try {
    const result = await pool.query(
      `SELECT t.id,
              t.ticket_code,
              t.status,
              t.valid_until,
              t.signature,
              v.full_name,
              v.visitor_type,
              v.country,
              v.city
       FROM museum_qr_tickets t
       LEFT JOIN museum_visitors v ON v.id = t.visitor_id
       WHERE t.ticket_code = $1`,
      [code.trim().toUpperCase()]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Ticket no encontrado" });
    }

    const ticket = result.rows[0];
    const approved = ticket.status === "active" && new Date(ticket.valid_until) >= new Date();

    res.json({ approved, ticket });
  } catch (error) {
    console.error("QR validation failed:", error);
    res.status(500).json({ error: "No se pudo validar el QR" });
  }
});

app.get("/api/history", requireDb, async (req, res) => {
  const search = searchValue(req);
  const historySearch = `%${search}%`;

  try {
    const result = await pool.query(
      `SELECT ae.id,
              v.full_name,
              v.visitor_type,
              v.country,
              v.city,
              COALESCE(r.name, 'Sin sala') AS room,
              to_char(ae.entered_at, 'YYYY-MM-DD HH24:MI') AS entered_at,
              ae.status,
              t.id AS ticket_id,
              t.ticket_code,
              u.username AS validated_by
       FROM museum_access_entries ae
       JOIN museum_visitors v ON v.id = ae.visitor_id
       LEFT JOIN museum_rooms r ON r.id = ae.room_id
       LEFT JOIN museum_qr_tickets t ON t.id = ae.ticket_id
       LEFT JOIN museum_auth_users u ON u.id = ae.validated_by
       WHERE ($1 = ''
         OR v.full_name ILIKE $2
         OR v.visitor_type ILIKE $2
         OR v.country ILIKE $2
         OR v.city ILIKE $2
         OR r.name ILIKE $2
         OR t.ticket_code ILIKE $2
         OR u.username ILIKE $2
         OR ae.status ILIKE $2
         OR to_char(ae.entered_at, 'YYYY-MM-DD HH24:MI') ILIKE $2)
       ORDER BY ae.entered_at DESC
       LIMIT 50`,
      [search, historySearch]
    );

    res.json({ history: result.rows });
  } catch (error) {
    console.error("History query failed:", error);
    res.status(500).json({ error: "No se pudo cargar el historial" });
  }
});

app.get("/api/reports", requireDb, async (_req, res) => {
  try {
    const result = await pool.query(
      `SELECT
         COUNT(*)::int AS total_entries,
         COUNT(*) FILTER (WHERE entered_at::date = CURRENT_DATE)::int AS today_entries,
         COUNT(*) FILTER (WHERE ticket_id IS NOT NULL)::int AS qr_entries,
         COUNT(DISTINCT ae.visitor_id)::int AS unique_visitors,
         COUNT(DISTINCT NULLIF(v.country, ''))::int AS countries_count,
         COUNT(DISTINCT NULLIF(v.city, ''))::int AS cities_count
       FROM museum_access_entries ae
       JOIN museum_visitors v ON v.id = ae.visitor_id`
    );

    res.json({ reports: result.rows[0] });
  } catch (error) {
    console.error("Reports query failed:", error);
    res.status(500).json({ error: "No se pudieron cargar los reportes" });
  }
});

app.get("/api/reports/accesses", requireDb, async (req, res) => {
  const { from, to } = req.query;
  const fromDate = from || new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
  const toDate = to || new Date().toISOString().slice(0, 10);
  const params = [fromDate, toDate];
  const rangeWhere = "ae.entered_at::date BETWEEN $1::date AND $2::date";

  try {
    const [summary, accesses, byCountry, byCity, byRoom] = await Promise.all([
      pool.query(
        `SELECT
           COUNT(*)::int AS total_entries,
           COUNT(DISTINCT ae.visitor_id)::int AS unique_visitors,
           COUNT(*) FILTER (WHERE ae.ticket_id IS NOT NULL)::int AS qr_entries,
           COUNT(DISTINCT NULLIF(v.country, ''))::int AS countries_count,
           COUNT(DISTINCT NULLIF(v.city, ''))::int AS cities_count
         FROM museum_access_entries ae
         JOIN museum_visitors v ON v.id = ae.visitor_id
         WHERE ${rangeWhere}`,
        params
      ),
      pool.query(
        `SELECT ae.id,
                v.full_name,
                v.visitor_type,
                v.country,
                v.city,
                COALESCE(r.name, 'Sin sala') AS room,
                to_char(ae.entered_at, 'YYYY-MM-DD HH24:MI') AS entered_at,
                ae.status,
                t.id AS ticket_id,
                t.ticket_code,
                u.username AS validated_by
         FROM museum_access_entries ae
         JOIN museum_visitors v ON v.id = ae.visitor_id
         LEFT JOIN museum_rooms r ON r.id = ae.room_id
         LEFT JOIN museum_qr_tickets t ON t.id = ae.ticket_id
         LEFT JOIN museum_auth_users u ON u.id = ae.validated_by
         WHERE ${rangeWhere}
         ORDER BY ae.entered_at DESC
         LIMIT 500`,
        params
      ),
      pool.query(
        `SELECT COALESCE(NULLIF(v.country, ''), 'Sin pais') AS label, COUNT(*)::int AS value
         FROM museum_access_entries ae
         JOIN museum_visitors v ON v.id = ae.visitor_id
         WHERE ${rangeWhere}
         GROUP BY label
         ORDER BY value DESC
         LIMIT 8`,
        params
      ),
      pool.query(
        `SELECT COALESCE(NULLIF(v.city, ''), 'Sin ciudad') AS label, COUNT(*)::int AS value
         FROM museum_access_entries ae
         JOIN museum_visitors v ON v.id = ae.visitor_id
         WHERE ${rangeWhere}
         GROUP BY label
         ORDER BY value DESC
         LIMIT 8`,
        params
      ),
      pool.query(
        `SELECT COALESCE(r.name, 'Sin sala') AS label, COUNT(*)::int AS value
         FROM museum_access_entries ae
         LEFT JOIN museum_rooms r ON r.id = ae.room_id
         WHERE ${rangeWhere}
         GROUP BY label
         ORDER BY value DESC
         LIMIT 8`,
        params
      )
    ]);

    res.json({
      range: { from: fromDate, to: toDate },
      summary: summary.rows[0],
      accesses: accesses.rows,
      rankings: {
        countries: byCountry.rows,
        cities: byCity.rows,
        rooms: byRoom.rows
      }
    });
  } catch (error) {
    console.error("Access report query failed:", error);
    res.status(500).json({ error: "No se pudo cargar el reporte de accesos" });
  }
});

app.use(express.static(distPath));

app.get("*", (_req, res) => {
  res.sendFile(path.join(distPath, "index.html"));
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor iniciado en puerto ${PORT}`);
});
