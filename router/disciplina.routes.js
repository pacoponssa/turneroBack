const express = require("express");
const router = express.Router();
const disciplinaController = require("../controllers/disciplina.controllers");

router.get("/", disciplinaController.obtenerDisciplinas);
router.post("/", disciplinaController.crearDisciplina);

module.exports = router;
