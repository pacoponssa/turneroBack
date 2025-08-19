const express = require("express");
const router = express.Router();
const profesorController = require("../controllers/profesorController");

// Listar profesores
router.get("/", profesorController.obtenerProfesores);

// Asignar disciplina a profesor
router.post("/:id/disciplina", profesorController.asignarDisciplina);

// Asignar profesor a un horario
router.put("/asignar-horario/:idHorario", profesorController.asignarProfesorAHorario);

router.get("/:id/turnos", profesorController.obtenerTurnosDelProfesor);
router.get("/:id/sueldo", profesorController.calcularSueldo);


module.exports = router;
