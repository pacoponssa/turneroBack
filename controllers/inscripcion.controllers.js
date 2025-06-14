// controllers/inscripcion.controller.js
// 👉 Para asignar disciplinas a un usuario (uso del admin)

const db = require("../models");

exports.asignarDisciplinasAUsuario = async (req, res) => {
  const { idUsuario } = req.params;
  const { idsDisciplinas } = req.body;

  try {
    await db.Inscripcion.destroy({ where: { idUsuario } });

    for (let idDisciplina of idsDisciplinas) {
      await db.Inscripcion.create({
        UsuarioIdUsuario: idUsuario,
        DisciplinaIdDisciplina: idDisciplina,
        fechaInscripcion: new Date(),
      });
    }

    res.json({ msg: "Inscripciones actualizadas correctamente" });
  } catch (error) {
    console.error("Error al asignar disciplinas:", error);
    res.status(500).json({ msg: "Error interno al asignar disciplinas" });
  }
};

exports.obtenerDisciplinasDeUsuario = async (req, res) => {
  const { idUsuario } = req.params;

  try {
    const inscripciones = await db.Inscripcion.findAll({
      where: { UsuarioIdUsuario: idUsuario },
      include: [{ model: db.Disciplina }],
    });

    const disciplinas = inscripciones.map((i) => i.Disciplina);
    res.json({ data: disciplinas });
  } catch (error) {
    console.error("Error al obtener disciplinas:", error);
    res.status(500).json({ msg: "Error interno al obtener disciplinas" });
  }
};

exports.eliminarDisciplinaDeUsuario = async (req, res) => {
  const { idUsuario, idDisciplina } = req.params;

  try {
    const resultado = await db.Inscripcion.destroy({
      where: {
        UsuarioIdUsuario: idUsuario,
        DisciplinaIdDisciplina: idDisciplina,
      },
    });

    if (resultado === 0) {
      return res.status(404).json({ msg: "Inscripción no encontrada" });
    }

    res.json({ msg: "Inscripción eliminada correctamente" });
  } catch (error) {
    console.error("Error al eliminar inscripción:", error);
    res.status(500).json({ msg: "Error interno al eliminar inscripción" });
  }
};
