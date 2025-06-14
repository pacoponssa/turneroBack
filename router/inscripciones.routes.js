// routes/inscripciones.routes.js
// Este archivo maneja inscripciones a HORARIOS (turnos), no a disciplinas.


// routes/inscripciones.routes.js
const express = require("express");
const router = express.Router();
const inscripcionesController = require("../controllers/inscripciones.controllers");

// Crea una inscripción a un horario
router.post("/", inscripcionesController.crearInscripcion);

// Lista inscripciones del usuario
router.get("/usuario/:idUsuario", inscripcionesController.inscripcionesPorUsuario);

// Cancela una inscripción
router.delete("/inscripcion/:id", inscripcionesController.eliminarInscripcion);

module.exports = router;
