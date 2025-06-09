const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();
const port = process.env.PORT || 3000;


// Cargar variables de entorno desde .env (si existe)
dotenv.config();

// Middleware para habilitar CORS (comunicación con frontend)
app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

// Middleware para recibir datos en JSON y formularios
app.use(express.json());
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
