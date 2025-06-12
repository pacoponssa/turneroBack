const db = require("../models");

exports.crearInscripcion = async (req, res) => {
  const { idUsuario, idDisciplina } = req.body;
  try {
    const nueva = await db.Inscripcion.create({
      idUsuario,
      idDisciplina,
      fechaInscripcion: new Date(),
    });
    res.status(201).json({ ok: true, data: nueva });
  } catch (error) {
    res.status(400).json({ ok: false, msg: "Error al inscribirse", error });
  }
};

exports.inscripcionesPorUsuario = async (req, res) => {
  try {
    const inscripciones = await db.Inscripcion.findAll({
      where: { idUsuario: req.params.idUsuario },
      include: db.Disciplina,
    });
    res.json({ ok: true, data: inscripciones });
  } catch (error) {
    res.status(500).json({ ok: false, error });
  }
};

exports.eliminarInscripcion = async (req, res) => {
  try {
    await db.Inscripcion.destroy({ where: { idInscripcion: req.params.idInscripcion } });
    res.json({ ok: true, msg: "Inscripción cancelada" });
  } catch (error) {
    res.status(500).json({ ok: false, error });
  }
};
