const express = require("express");
const router = express.Router();
const inscripcionController = require("../controllers/inscripcion.controllers");

router.post("/:idUsuario/disciplina", inscripcionController.asignarDisciplinasAUsuario);
router.get("/:idUsuario/disciplina", inscripcionController.obtenerDisciplinasDeUsuario);
router.delete("/:idUsuario/disciplinas/:idDisciplina", inscripcionController.eliminarDisciplinaDeUsuario);

module.exports = router;
