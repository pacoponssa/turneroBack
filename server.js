const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const db = require("./models");
const rutas = require("./router/index.routes");
const listEndpoints = require("express-list-endpoints"); // OPCIONAL

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors({
  origin: "http://localhost:5173", // URL del frontend
  credentials: true
}));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// Conexión a la base de datos
db.sequelize.sync({ alter: true })
  .then(() => console.log("🔥 Base de datos conectada correctamente."))
  .catch((error) => console.error("❌ Error al conectar a la base de datos:", error));

// Rutas agrupadas
app.use("/", rutas);

// Ruta de prueba
app.get("/", (req, res) => {
  res.send("<h1>API de Turnos Gym</h1><p>Bienvenido. Usa el frontend para interactuar.</p>");
});

// Mostrar rutas activas (seguro)
try {
  const endpoints = listEndpoints(app);
  console.log("📚 Rutas activas:");
  endpoints.forEach(ep => {
    console.log(`🔗 ${ep.methods.join(", ")} ${ep.path}`);
  });
} catch (err) {
  console.warn("⚠️ No se pudieron listar las rutas activas.");
}

// Iniciar servidor
app.listen(port, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${port}`);
  if (!process.env.ACCESS_TOKEN_SECRET) {
    console.warn("⚠️ Falta ACCESS_TOKEN_SECRET en .env para JWT.");
  }
});
