const express = require("express");
const router = express.Router();
const horarioController = require("../controllers/horario.controllers");

router.get("/", horarioController.obtenerHorarios);
router.get("/:id", horarioController.obtenerHorarioPorId);
router.post("/", horarioController.crearHorario);
router.post("/generar", horarioController.generarHorariosDesdeDisponibilidad);
router.delete("/:id", horarioController.eliminarHorario);
router.put("/:id", horarioController.actualizarHorario);    

module.exports = router;
