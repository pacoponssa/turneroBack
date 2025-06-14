const express = require("express");
const router = express.Router();
const inscripcionController = require("../controllers/inscripcion.controllers");

router.post("/:idUsuario/disciplinas", inscripcionController.asignarDisciplinasAUsuario);
router.get("/:idUsuario/disciplinas", inscripcionController.obtenerDisciplinasDeUsuario);
router.delete("/:idUsuario/disciplinas/:idDisciplina", inscripcionController.eliminarDisciplinaDeUsuario);

module.exports = router;
