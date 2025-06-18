const express = require("express");
const cors = require("cors");

const cookieParser = require("cookie-parser");

const app = express();
const dotenv = require("dotenv");

const port = process.env.PORT || 3000;

// Cargar variables de entorno desde .env (si existe)
dotenv.config();

// Middleware para habilitar CORS (comunicación con frontend)
app.use(cors({
  origin: "http://localhost:5173",   // URL de tu frontend
  credentials: true                  // Permitir cookies
}));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

// Middleware para recibir datos en JSON y formularios
app.use(express.json());
app.use(cookieParser());

app.use(express.urlencoded({ extended: true }));

// CONEXIÓN A BASE DE DATOS

const db = require("./models/index");

db.sequelize.sync({ alter: true })
  .then(() => {
    console.log("Base de datos conectada correctamente.");
  })
  .catch((error) => {
    console.error("Error al conectar a la base de datos:", error);
  });

// RUTAS
const inscripcionRoutes = require('./router/inscripcion.routes');
app.use("/inscripcion", inscripcionRoutes);

const inscripcionesRoutes = require('./router/inscripciones.routes');
app.use("/inscripciones", inscripcionesRoutes);

const reservaRoutes = require('./router/reserva.routes');
app.use("/reservas", reservaRoutes); // o el endpoint que uses


// Rutas de autenticación: /auth/login, /auth/register, etc.
app.use("/auth", require("./router/auth.routes"));

// Rutas de las entidades del sistema (usuarios, horarios, reservas, etc.)
require("./router/index.routes")(app); // este importa todas las rutas agrupadas


// RUTA PRINCIPAL DE PRUEBA

app.get("/", (req, res) => {
  res.send("<h1>API de Turnos Gym</h1><p>Bienvenido. Usa el frontend para interactuar.</p>");
});

// INICIO DEL SERVIDOR

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
  if (!process.env.ACCESS_TOKEN_SECRET) {
    console.warn("Falta definir ACCESS_TOKEN_SECRET en .env. JWT no funcionará correctamente.");
  }
});
