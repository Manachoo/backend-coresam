const express = require('express');
const router = express.Router();

// Importar la conexión a la base de datos desde db.js
const { sql, poolPromise } = require('../database/conection');

// Ruta para obtener todos los usuarios
router.get('/api/liquidacion/usuarios', async (req, res) => {
  try {
    const pool = await poolPromise;  // Obtener la conexión al pool de SQL Server
    const result = await pool.request().query(`SELECT RunCuerpo, RunDigito, Nombres, ApellidoPaterno, ApellidoMaterno, Email FROM [Castellano].[dbo].[Persona]`);  // Ejecutar consulta SQL
    res.json(result.recordset);  // Enviar los resultados como JSON
  } catch (err) {
    res.status(500).json({ error: err.message });  // Manejo de errores
  }
});
router.get('/api/liquidacion/usuarios/rut/:id', async (req, res) => {
  try {
    const pool = await poolPromise;
    const rut = parseInt(req.params.id)
    const result = await pool.request().query(`SELECT AnoNumero, MesNumero, TotalDescuentos, TotalHaberes, TotalImposiciones, TotalTributable, ImponiblePrevisional, ImponibleSalud, CargoNombre, NombreAFP, NombreInstitucionSalud, RunCuerpo, RunDigito, SueldoLiquido, Nombres, ApellidoPaterno FROM [Castellano].[Remuneraciones].[Liquidacion] INNER JOIN [Castellano].[dbo].[Empresa] on [Castellano].[Remuneraciones].[Liquidacion].EmpresaId = [Castellano].[dbo].[Empresa].id INNER JOIN [Castellano].[dbo].[Persona] on [Castellano].[Remuneraciones].[Liquidacion].TrabajadorId = [Castellano].[dbo].[Persona].Id WHERE RunCuerpo ='${rut}';`);  // Ejecutar consulta SQL
    res.json(result.recordset);  // Enviar los resultados como JSON
  } catch (err) {
    res.status(500).json({ error: err.message });  // Manejo de errores
  }
});

router.get('/api/liquidacion/usuario/:id/:year/:month', async (req, res) => {
  try {
    const pool = await poolPromise;
    const rut = parseInt(req.params.id)
    const year = parseInt(req.params.year)
    const month = parseInt(req.params.month)
    const result = await pool.request().query(`SELECT AnoNumero,MesNumero = dbo.Mes.Nombre,TotalDescuentos,NumeroBienios,TotalHaberes,TotalImposiciones,TotalTributable,ImponiblePrevisional,ImponibleSeguroCesantia,ImponibleSalud,OtrosDescuentos,AFCEmpleador,SISEmpleador,DiasTrabajados,MontoMutual,SueldoLiquido,CargoNombre,NombreAFP,NumeroBienios,PorcentajeAFP,HorasExtra,HorasRetraso,Inasistencias,DiasLicenciaMedica,NombreInstitucionSalud,CentroCostoNombre,TipoContratoNombre,NumeroCargasFamiliares,FechaIngreso,RunCuerpo,RunDigito,Nombres, ApellidoPaterno, ApellidoMaterno FROM [Castellano].[Remuneraciones].[Liquidacion] INNER JOIN [Castellano].[dbo].[Empresa] on [Castellano].[Remuneraciones].[Liquidacion].EmpresaId = [Castellano].[dbo].[Empresa].id INNER JOIN [Castellano].[dbo].[Persona] on [Castellano].[Remuneraciones].[Liquidacion].TrabajadorId = [Castellano].[dbo].[Persona].Id INNER JOIN [Castellano].[dbo].[Mes] on  [Castellano].[Remuneraciones].[Liquidacion].MesNumero = [Castellano].[dbo].[Mes].Numero WHERE RunCuerpo ='${rut}' and anoNumero='${year}' and MesNumero='${month}'`);  // Ejecutar consulta SQL
    res.json(result.recordset);  // Enviar los resultados como JSON
  } catch (err) {
    res.status(500).json({ error: err.message });  // Manejo de errores
  }
});


module.exports = router;
