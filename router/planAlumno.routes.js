const express = require("express");
const router = express.Router();
const planAlumnoController = require("../controllers/planAlumno.controllers.js");

// ✅ Ruta específica primero
router.get("/usuario/:idUsuario/clases", planAlumnoController.obtenerClasesDisponibles);

// ✅ Usamos la versión que crea plan + reservas automáticamente
router.get("/:id", planAlumnoController.obtenerPlanPorId);
router.post("/", planAlumnoController.crearPlanConReservas);

// CRUD común
router.get("/", planAlumnoController.obtenerPlanes);
router.put("/:id", planAlumnoController.actualizarPlan);
router.delete("/:id", planAlumnoController.eliminarPlan);

module.exports = router;
