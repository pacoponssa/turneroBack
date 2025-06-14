// controllers/inscripciones.controller.js
const db = require("../models");

// Crear una inscripción a un horario
exports.crearInscripcion = async (req, res) => {
  try {
    const { UsuarioIdUsuario, HorarioIdHorario } = req.body;

    const nuevaInscripcion = await db.Inscripcion.create({
      UsuarioIdUsuario,
      HorarioIdHorario,
      fechaInscripcion: new Date(),
    });

    res.status(201).json({ msg: "Inscripción creada", data: nuevaInscripcion });
  } catch (err) {
    console.error("Error al crear inscripción:", err);
    res.status(500).json({ msg: "Error al crear inscripción" });
  }
};

// Obtener todas las inscripciones de un usuario a horarios
exports.inscripcionesPorUsuario = async (req, res) => {
  try {
    const { idUsuario } = req.params;

    const inscripciones = await db.Inscripcion.findAll({
      where: { UsuarioIdUsuario: idUsuario },
      include: [{ model: db.Horario, include: [db.Disciplina] }],
    });

    res.json({ data: inscripciones });
  } catch (err) {
    console.error("Error al obtener inscripciones:", err);
    res.status(500).json({ msg: "Error al obtener inscripciones" });
  }
};

// Eliminar una inscripción a un horario (cancelación)
exports.eliminarInscripcion = async (req, res) => {
  try {
    const { id } = req.params;

    const resultado = await db.Inscripcion.destroy({
      where: { idInscripcion: id },
    });

    if (resultado === 0) {
      return res.status(404).json({ msg: "Inscripción no encontrada" });
    }

    res.json({ msg: "Inscripción eliminada correctamente" });
  } catch (err) {
    console.error("Error al eliminar inscripción:", err);
    res.status(500).json({ msg: "Error interno al eliminar inscripción" });
  }
};
