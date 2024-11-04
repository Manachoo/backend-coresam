const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const routes = require('./src/routes/users')
const cors = require('cors');

// Configurar variables de entorno
dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// Middlewares
app.use(express.json());  // Para parsear cuerpos de solicitudes JSON
app.use(morgan('dev'));   // Logging de peticiones HTTP
app.use(cors()); 
// Rutas
app.use('/api', routes);

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
