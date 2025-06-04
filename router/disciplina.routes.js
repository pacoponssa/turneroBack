const express = require("express");
const router = express.Router();
const disciplinaController = require("../controllers/disciplina.controllers");

router.get("/", disciplinaController.obtenerDisciplinas);
router.post("/", disciplinaController.crearDisciplina);
router.delete("/:id", disciplinaController.eliminarDisciplina);
router.put("/:id", disciplinaController.actualizarDisciplina);

module.exports = router;
