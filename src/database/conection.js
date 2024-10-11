const sql = require('mssql');
require('dotenv').config();

// Configuración de la conexión a SQL Server
const config = {
  user: process.env.DB_USER ,
  password: process.env.DB_PASSWORD ,
  server: process.env.DB_HOST,
  database: process.env.DB_NAME,
  port: parseInt(process.env.DB_PORT),
  options: {
    trustServerCertificate: true // Necesario si no tienes un certificado SSL
  }
};

// Crear una conexión con SQL Server
const poolPromise = new sql.ConnectionPool(config)
  .connect()
  .then(pool => {
    console.log('Connected to SQL Server');
    return pool;
  })
  .catch(err => {
    console.error('Error connecting to SQL Server:', err.message);
    process.exit(1);
  });

// Exportar la conexión
module.exports = {
  sql,
  poolPromise
};
