// controllers/inscripcion.controller.js
// 👉 Para asignar disciplinas a un usuario (uso del admin)

// const db = require("../models");
const { Op } = require("sequelize");
const db = require("../models/index");
const Usuario = db.Usuario;
const Disciplina = db.Disciplina;
const Inscripcion = db.Inscripcion;
const Horario = db.Horario;
const Reserva = db.Reserva;

exports.asignarDisciplinasAUsuario = async (req, res) => {
  const idUsuario = req.params.idUsuario;
  const idsDisciplinas = req.body.idsDisciplinas;

  try {
    // 1. Eliminar inscripciones anteriores
    await db.InscripcionUsuario.destroy({ where: { idUsuario } });

    // 2. Crear nuevas inscripciones
    const nuevasInscripciones = idsDisciplinas.map((idDisciplina) => ({
      idUsuario,
      idDisciplina,
    }));
    await db.InscripcionUsuario.bulkCreate(nuevasInscripciones);

    // 3. Obtener todos los horarios futuros de todas las disciplinas seleccionadas
    const horarios = await db.Horario.findAll({
      where: {
        idDisciplina: idsDisciplinas,
        fecha: { [db.Sequelize.Op.gte]: new Date() },
      },
    });

    // 4. Filtrar aquellos horarios que aún no tengan una reserva para este usuario
    const reservasExistentes = await db.Reserva.findAll({
      where: {
        idUsuario,
        idHorario: horarios.map((h) => h.idHorario),
      },
      attributes: ["idHorario"],
    });

    const idsHorariosReservados = reservasExistentes.map((r) => r.idHorario);

    const nuevasReservas = horarios
      .filter((h) => !idsHorariosReservados.includes(h.idHorario))
      .map((horario) => ({
        idUsuario,
        idHorario: horario.idHorario,
        fechaReserva: new Date(),
      }));

    await db.Reserva.bulkCreate(nuevasReservas);

    res.status(200).json({
      ok: true,
      msg: "Disciplinas y reservas asignadas correctamente",
    });
  } catch (error) {
    console.error("❌ Error al asignar disciplinas y reservas:", error);
    res.status(500).json({
      ok: false,
      msg: "Error al asignar disciplinas",
      error: error.message,
    });
  }
};

// 👉 Obtener disciplinas asignadas a un usuario
exports.obtenerDisciplinasDeUsuario = async (req, res) => {
  const { idUsuario } = req.params;

  try {
    const usuario = await db.Usuario.findByPk(idUsuario, {
      include: {
        model: db.Disciplina,
        as: "Disciplinas", // 👈 debe coincidir con el alias arriba
        through: { attributes: [] }, // 👈 opcional para ocultar tabla intermedia
      },
    });

    if (!usuario) {
      return res.status(404).json({ msg: "Usuario no encontrado" });
    }

    res.json({ data: usuario.Disciplinas });
  } catch (error) {
    console.error("Error al obtener disciplinas:", error);
    res.status(500).json({ msg: "Error interno al obtener disciplinas" });
  }
};

// 👉 Eliminar disciplina específica asignada a un usuario
exports.eliminarDisciplinaDeUsuario = async (req, res) => {
  const { idUsuario, idDisciplina } = req.params;

  try {
    const result = await db.InscripcionUsuario.destroy({
      where: {
        idUsuario,
        idDisciplina,
      },
    });

    if (result === 0) {
      return res.status(404).json({ msg: "Inscripción no encontrada" });
    }

    res.json({ msg: "Inscripción eliminada correctamente" });
  } catch (error) {
    console.error("Error al eliminar inscripción:", error);
    res.status(500).json({ msg: "Error interno al eliminar inscripción" });
  }
};
