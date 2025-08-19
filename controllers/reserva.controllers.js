const db = require("../models/index");
const Reserva = db.Reserva;
const Horario = db.Horario;
const Disciplina = db.Disciplina;
const Usuario = db.Usuario;

exports.obtenerReservas = async (req, res) => {
  try {
    const reservas = await Reserva.findAll({
      include: [
        {
          model: Horario,
          include: [Disciplina],
        },
        {
          model: Usuario, // opcional
          attributes: ["idUsuario", "nombre", "dni"], // solo si querés mostrar info del alumno
        },
      ],
    });

    res.json({
      ok: true,
      msg: "Listado de reservas",
      status: 200,
      data: reservas,
    });
  } catch (error) {
    console.error("Error al obtener reservas:", error);
    res.status(500).json({
      ok: false,
      msg: "Error al obtener reservas",
      error,
    });
  }
};

// CREAR RESERVA CON CONTROL DE CUPO

exports.crearReserva = async (req, res) => {
  const { idUsuario, idHorario } = req.body;

  try {
    // 1. Verificar si el usuario ya tiene una reserva en ese horario
    const existeReserva = await db.Reserva.findOne({
      where: {
        idUsuario,
        idHorario,
      },
    });

    if (existeReserva) {
      return res
        .status(400)
        .json({ msg: "Ya tienes una reserva para este horario." });
    }

    // 2. Contar cuántas reservas hay para ese horario
    const totalReservas = await db.Reserva.count({
      where: { idHorario },
    });

    // 3. Traer el horario y su disciplina para saber el cupo
    const horario = await db.Horario.findByPk(idHorario, {
      include: db.Disciplina,
    });

    if (!horario) {
      return res.status(404).json({ msg: "Horario no encontrado" });
    }

    const cupoMaximo = horario.Disciplina.cupoPorTurno;

    if (totalReservas >= cupoMaximo) {
      return res
        .status(400)
        .json({ msg: "El cupo para este horario está completo." });
    }

    // 4. Crear la reserva
    const nuevaReserva = await db.Reserva.create({
      idUsuario,
      idHorario,
      fechaReserva: new Date(),
    });

    res.status(201).json({ msg: "Reserva creada", data: nuevaReserva });
  } catch (error) {
    console.error("Error al crear reserva:", error);
    res.status(500).json({ msg: "Error interno al crear la reserva" });
  }
};

exports.eliminarReserva = (req, res) => {
  const idReserva = req.params.id;

  Reserva.destroy({ where: { idReserva } })
    .then((resultado) => {
      if (resultado) {
        res.status(200).json({
          ok: true,
          msg: "Reserva eliminada",
          status: 200,
        });
      } else {
        res.status(404).json({
          ok: false,
          msg: "Reserva no encontrada",
          status: 404,
        });
      }
    })
    .catch((error) => {
      res.status(500).json({
        ok: false,
        msg: "Error al eliminar la reserva",
        status: 500,
        data: error,
      });
    });
};

exports.actualizarReserva = (req, res) => {
  const idReserva = req.params.id;
  const { idUsuario, idHorario } = req.body;

  Reserva.update({ idUsuario, idHorario }, { where: { idReserva } })
    .then((resultado) => {
      if (resultado[0]) {
        res.status(200).json({
          ok: true,
          msg: "Reserva actualizada",
          status: 200,
        });
      } else {
        res.status(404).json({
          ok: false,
          msg: "Reserva no encontrada",
          status: 404,
        });
      }
    })
    .catch((error) => {
      res.status(500).json({
        ok: false,
        msg: "Error al actualizar la reserva",
        status: 500,
        data: error,
      });
    });
};

exports.obtenerReservaPorId = (req, res) => {
  const idReserva = req.params.id;

  Reserva.findOne({ where: { idReserva } })
    .then((registro) => {
      if (registro) {
        res.status(200).json({
          ok: true,
          msg: "Reserva encontrada",
          status: 200,
          data: registro,
        });
      } else {
        res.status(404).json({
          ok: false,
          msg: "Reserva no encontrada",
          status: 404,
          data: null,
        });
      }
    })
    .catch((error) => {
      res.status(500).json({
        ok: false,
        msg: "Error al obtener la reserva",
        status: 500,
        data: error,
      });
    });
};

exports.obtenerReservasPorUsuario = async (req, res) => {
  try {
    const idUsuario = req.params.id;
    console.log("Buscando reservas para usuario ID:", idUsuario);

    const reservas = await db.Reserva.findAll({
      where: { idUsuario },
      include: [
        {
          model: db.Horario,
          include: [{ model: db.Disciplina }],
        },
      ],
    });

    console.log("Reservas encontradas:", reservas.length);

    res.status(200).json({
      ok: true,
      msg: "Reservas del usuario",
      data: reservas,
    });
  } catch (error) {
    console.error("❌ Error en obtenerReservasPorUsuario:", error);
    res.status(500).json({
      ok: false,
      msg: "Error interno al obtener reservas del usuario",
      error: error.message,
    });
  }
};

exports.obtenerReservasPorHorario = (req, res) => {
  const idHorario = req.params.id;

  Reserva.findAll({ where: { idHorario } })
    .then((registros) => {
      if (registros.length > 0) {
        res.status(200).json({
          ok: true,
          msg: "Reservas encontradas para el horario",
          status: 200,
          data: registros,
        });
      } else {
        res.status(404).json({
          ok: false,
          msg: "No hay reservas para este horario",
          status: 404,
          data: null,
        });
      }
    })
    .catch((error) => {
      res.status(500).json({
        ok: false,
        msg: "Error al obtener las reservas del horario",
        status: 500,
        data: error,
      });
    });
};


exports.cancelarReserva = async (req, res) => {
  const idReserva = req.params.id;

  try {
    const reserva = await db.Reserva.findByPk(idReserva);

    if (!reserva) {
      return res.status(404).json({
        ok: false,
        msg: "Reserva no encontrada",
        status: 404,
      });
    }

    reserva.cancelada = true;
    await reserva.save();

    res.status(200).json({
      ok: true,
      msg: "Reserva cancelada correctamente",
      status: 200,
    });
  } catch (error) {
    console.error("Error al cancelar reserva:", error);
    res.status(500).json({
      ok: false,
      msg: "Error al cancelar la reserva",
      status: 500,
      error,
    });
  }
};
