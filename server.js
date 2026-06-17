const express = require("express");
const path = require("path");
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

app.get("/api/health", (_req, res) => {
  res.json({
    ok: true,
    service: "museum_access_control",
    database: pool ? "configured" : "missing DATABASE_URL"
  });
});

app.post("/api/login", async (req, res) => {
  if (!pool) {
    return res.status(503).json({ error: "DATABASE_URL is not configured" });
  }

  const { username, password } = req.body;

  try {
    const result = await pool.query(
      "SELECT id, username, first_name, role FROM museum_auth_users WHERE username = $1 AND password_hash = $2 AND is_active = true",
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

app.use(express.static(distPath));

app.get("*", (_req, res) => {
  res.sendFile(path.join(distPath, "index.html"));
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor iniciado en puerto ${PORT}`);
});
