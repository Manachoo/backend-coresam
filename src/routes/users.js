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
router.get('/liquidacion/usuarios/rut/:id', async (req, res) => {
  try {
    const pool = await poolPromise;
    const rut = parseInt(req.params.id)
    const result = await pool.request().query(`SELECT AnoNumero, MesNumero, TotalDescuentos, TotalHaberes, TotalImposiciones, TotalTributable, ImponiblePrevisional, ImponibleSalud, CargoNombre, NombreAFP, NombreInstitucionSalud, RunCuerpo, RunDigito, SueldoLiquido, Nombres, ApellidoPaterno FROM [Castellano].[Remuneraciones].[Liquidacion] INNER JOIN [Castellano].[dbo].[Empresa] on [Castellano].[Remuneraciones].[Liquidacion].EmpresaId = [Castellano].[dbo].[Empresa].id INNER JOIN [Castellano].[dbo].[Persona] on [Castellano].[Remuneraciones].[Liquidacion].TrabajadorId = [Castellano].[dbo].[Persona].Id WHERE RunCuerpo ='${rut}';`);  // Ejecutar consulta SQL
    res.json(result.recordset);  // Enviar los resultados como JSON
  } catch (err) {
    res.status(500).json({ error: err.message });  // Manejo de errores
  }
});

router.get('/liquidacion/usuario/:id/:year/:month', async (req, res) => {
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

//contabilidad
//ver cuentas contables
router.get('/contabilidad/cuentas', async (req, res) => {
  try {
    const pool = await poolPromise;  // Obtener la conexión al pool de SQL Server
    const result = await pool.request().query(`SELECT AnoNumero, NumeroNivel, Numero, Descripcion, RazonSocial, Nombre, RutCuerpo, RutDigito FROM Contabilidad.CuentaPresupuestaria INNER JOIN Empresa on CuentaPresupuestaria.EmpresaId = Empresa.Id INNER JOIN TipoCuenta on CuentaPresupuestaria.TipoCuentaCodigo = TipoCuenta.Codigo ORDER by NumeroNivel ASC;`);  // Ejecutar consulta SQL
    res.json(result.recordset);  // Enviar los resultados como JSON
  } catch (err) {
    res.status(500).json({ error: err.message });  // Manejo de errores
  }
});

//movimientos por año
router.get('/contabilidad/movimientos/:year', async (req, res) => {
  try {
    const pool = await poolPromise;
    const year = parseInt(req.params.year)
    const result = await pool.request().query(`SELECT TOP (10) [AnoNumero],Comprobante.Id,[DepartamentoId] = Departamento.Nombre,[UnidadId] = Unidad.Nombre,[FuncionarioId] = Persona.Nombres + Persona.ApellidoPaterno,[Fecha],[Numero],[TotalDebe],[TotalHaber],[GlosaGlobal],[ComprobanteTipoCodigo] = ComprobanteTipo.Nombre,[EstadoComprobanteCodigo] = EstadoComprobante.Nombre FROM [Castellano].[Contabilidad].[Comprobante] INNER JOIN [Castellano].[Contabilidad].[ComprobanteTipo] on Comprobante.ComprobanteTipoCodigo = ComprobanteTipo.Codigo INNER JOIN [Castellano].[Contabilidad].[EstadoComprobante] on Comprobante.EstadoComprobanteCodigo = EstadoComprobante.Codigo INNER JOIN [Castellano].[dbo].[Unidad] on Comprobante.UnidadId = Unidad.Id INNER JOIN [Castellano].[dbo].[Departamento] on Comprobante.DepartamentoId = Departamento.Id INNER JOIN [Castellano].[dbo].[Persona] on Comprobante.FuncionarioId = Persona.Id WHERE AnoNumero ='${year}' ORDER By Fecha ASC`);  // Ejecutar consulta SQL
    res.json(result.recordset);  // Enviar los resultados como JSON
  } catch (err) {
    res.status(500).json({ error: err.message });  // Manejo de errores
  }
});

module.exports = router;
