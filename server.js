const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send(`
    <h1>Museum Access Control</h1>
    <p>Aplicación funcionando correctamente.</p>
  `);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Servidor iniciado en puerto " + PORT);
});
