const db = require("../models/index");
const Reserva = db.Reserva;
const Horario = db.Horario;
const Disciplina = db.Disciplina;

exports.obtenerReservas = (req, res) => {
  Reserva.findAll()
    .then((registros) => {
      res.status(200).json({
        ok: true,
        msg: "Listado de reservas",
        status: 200,
        data: registros,
      });
    })
    .catch((error) => {
      res.status(500).json({
        ok: false,
        msg: "Error al obtener las reservas",
        status: 500,
        data: error,
      });
    });
};

// CREAR RESERVA CON CONTROL DE CUPO
exports.crearReserva = async (req, res) => {
  const { idUsuario, idHorario } = req.body;

  try {
    // Validar que el horario exista y tenga su disciplina asociada
    const horario = await Horario.findByPk(idHorario, {
      include: { model: Disciplina },
    });

    if (!horario) {
      return res.status(404).json({ message: "Horario no encontrado." });
    }

    const cupoMaximo = horario.Disciplina?.cupoPorTurno;

    if (!cupoMaximo) {
      return res.status(400).json({ message: "No se definió el cupo para esta disciplina." });
    }

    // Verificar si ya existe una reserva para el mismo usuario en ese horario
    const reservaExistente = await Reserva.findOne({
      where: { idUsuario, idHorario },
    });

    if (reservaExistente) {
      return res.status(400).json({ message: "Ya tiene una reserva en este horario." });
    }

    // Contar reservas actuales para ese horario
    const reservasActuales = await Reserva.count({ where: { idHorario } });

    if (reservasActuales >= cupoMaximo) {
      return res.status(400).json({ message: "No hay cupo disponible para este horario." });
    }

    // Crear la reserva
    const nuevaReserva = await Reserva.create({
      idUsuario,
      idHorario,
      fechaReserva: new Date(), // Se registra la fecha de reserva
    });

    res.status(201).json({
      ok: true,
      msg: "Reserva creada",
      status: 201,
      data: nuevaReserva,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Error al crear la reserva",
      status: 500,
      data: error.message,
    });
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
    const { id } = req.params;

    const reservas = await db.Reserva.findAll({
      where: { idUsuario: id },
      include: {
        model: db.Horario,
        include: {
          model: db.Disciplina,
          attributes: ["nombre"],
        },
      },
    });

    const reservasMapeadas = reservas.map((reserva) => ({
      idReserva: reserva.idReserva,
      fecha: reserva.Horario.fecha,
      horaInicio: reserva.Horario.horaInicio,
      horaFin: reserva.Horario.horaFin,
      Disciplina: reserva.Horario.Disciplina,
    }));

    res.status(200).json({
      ok: true,
      msg: "Reservas del usuario",
      data: reservasMapeadas,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Error al obtener las reservas del usuario",
      error,
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

