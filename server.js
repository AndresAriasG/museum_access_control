const express = require("express");
const { Pool } = require("pg");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

app.get("/", (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Museum Access Control</title>
      <style>
        body {
          margin: 0;
          font-family: Arial, sans-serif;
          background: linear-gradient(135deg, #0f172a, #1e293b);
          height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          color: white;
        }

        .card {
          width: 380px;
          background: white;
          color: #1e293b;
          padding: 35px;
          border-radius: 20px;
          box-shadow: 0 20px 50px rgba(0,0,0,0.35);
        }

        .logo {
          text-align: center;
          font-size: 42px;
          margin-bottom: 10px;
        }

        h1 {
          text-align: center;
          margin: 0;
          font-size: 26px;
        }

        p {
          text-align: center;
          color: #64748b;
          margin-bottom: 30px;
        }

        label {
          font-weight: bold;
          font-size: 14px;
        }

        input {
          width: 100%;
          padding: 13px;
          margin-top: 8px;
          margin-bottom: 18px;
          border: 1px solid #cbd5e1;
          border-radius: 10px;
          font-size: 15px;
          box-sizing: border-box;
        }

        button {
          width: 100%;
          padding: 14px;
          border: none;
          border-radius: 10px;
          background: #2563eb;
          color: white;
          font-size: 16px;
          font-weight: bold;
          cursor: pointer;
        }

        button:hover {
          background: #1d4ed8;
        }

        .footer {
          margin-top: 25px;
          text-align: center;
          font-size: 12px;
          color: #94a3b8;
        }
      </style>
    </head>
    <body>
      <div class="card">
        <div class="logo">🎟️</div>
        <h1>Museum Access Control</h1>
        <p>Control de ingreso con QR</p>

        <form method="POST" action="/login">
          <label>Usuario</label>
          <input name="username" placeholder="Ingrese su usuario" required />

          <label>Contraseña</label>
          <input name="password" type="password" placeholder="Ingrese su contraseña" required />

          <button type="submit">Ingresar</button>
        </form>

        <div class="footer">
          Sistema de acceso museo · MVP
        </div>
      </div>
    </body>
    </html>
  `);
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const result = await pool.query(
    "SELECT * FROM museum_auth_users WHERE username = $1 AND password_hash = $2 AND is_active = true",
    [username, password]
  );

  if (result.rows.length === 0) {
    return res.send(`
      <h2>Usuario o contraseña incorrectos</h2>
      <a href="/">Volver</a>
    `);
  }

  const user = result.rows[0];

  res.send(`
    <h1>Dashboard</h1>
    <p>Bienvenido, ${user.first_name}</p>
    <p>Rol: ${user.role}</p>
    <hr>
    <button>Registrar entrada</button>
    <button>Validar QR</button>
    <button>Ver reportes</button>
  `);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Servidor iniciado en puerto " + PORT);
});
