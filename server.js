const express = require('express');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Rutas
require('./router/index.routes.js')(app);

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});

