const express = require("express");
const router = express.Router();
const horarioController = require("../controllers/horario.controllers");

router.get("/", horarioController.obtenerHorarios);
router.post("/", horarioController.crearHorario);

module.exports = router;
