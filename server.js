const express = require('express');
require('dotenv').config();
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

// Middleware para parsear JSON en el cuerpo de las peticiones
app.use(express.json());

// Middleware para parsear datos de formularios URL-encoded
app.use(express.urlencoded({ extended: true }));

// Configurar CORS para permitir solicitudes desde http://localhost:5173
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Rutas
require('./router/index.routes.js')(app);

// Ruta de bienvenida
app.get('/', (req, res) => {
    res.send('<h1>API para interactuar con Google AI</h1><p>Usa la ruta POST /api/ask para enviar preguntas.</p>');
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
    if (!process.env.GOOGLE_API_KEY) {
        console.warn('ADVERTENCIA: La variable de entorno GOOGLE_API_KEY no está configurada. La API de Google AI no funcionará.');
    }
});