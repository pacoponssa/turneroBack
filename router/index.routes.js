const express = require("express");
const router = express.Router();

// Rutas del sistema
router.use("/usuario", require("./usuario.routes"));
router.use("/disciplina", require("./disciplina.routes"));
router.use("/horario", require("./horario.routes"));
router.use("/reserva", require("./reserva.routes"));
router.use("/cancelacion", require("./cancelacion.routes"));
router.use("/auth", require("./auth.routes"));
router.use("/api", require("./ai.routes")); // Ruta para IA
router.use("/inscripcion", require("./inscripcion.routes")); // Asignar disciplinas (admin)
// router.use("/inscripciones", require("./inscripcionUsuario.routes")); // Inscribirse a horarios (alumno)
router.use("/planAlumno", require("./planAlumno.routes")); // Planes de los alumnos
router.use("/inscripcion-usuario", require("./inscripcionUsuario.routes"));
router.use("/profesor", require("./profesor.routes")); // Profesores y disciplinas

module.exports = router;
