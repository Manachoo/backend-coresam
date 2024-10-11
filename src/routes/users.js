const express = require('express');
const router = express.Router();

// Importar la conexión a la base de datos desde db.js
const { sql, poolPromise } = require('../database/conection');

// Ruta para obtener todos los usuarios
router.get('/liquidacion/usuarios', async (req, res) => {
  try {
    const pool = await poolPromise;  // Obtener la conexión al pool de SQL Server
    const result = await pool.request().query(`SELECT RunCuerpo, RunDigito, Nombres, ApellidoPaterno, ApellidoMaterno, Email FROM [Castellano].[dbo].[Persona]`);  // Ejecutar consulta SQL
    res.json(result.recordset);  // Enviar los resultados como JSON
  } catch (err) {
    res.status(500).json({ error: err.message });  // Manejo de errores
  }
});

module.exports = router;
