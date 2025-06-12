const express = require("express");
const router = express.Router();
const inscripcionController = require("../controllers/inscripcion.controllers");

router.post("/", inscripcionController.crearInscripcion);
router.get("/usuario/:idUsuario", inscripcionController.inscripcionesPorUsuario);
// router.delete("/:id", inscripcionController.eliminarInscripcion);

router.delete("/inscripcion/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const resultado = await db.Inscripcion.destroy({
      where: { idInscripcion: id }
    });

    if (resultado === 0) {
      return res.status(404).json({ msg: "Inscripción no encontrada" });
    }

    res.json({ msg: "Inscripción eliminada correctamente" });
  } catch (err) {
    console.error("Error al eliminar inscripción:", err); // Esto mostrará el error
    res.status(500).json({ msg: "Error interno al eliminar inscripción" });
  }
});

module.exports = router;
