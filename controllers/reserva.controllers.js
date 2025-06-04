const db = require("../models/index");
const Reserva = db.Reserva;

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

exports.crearReserva = (req, res) => {
  const { idUsuario, idHorario } = req.body;

  Reserva.create({
    idUsuario,
    idHorario
  })
    .then((registro) => {
      res.status(201).json({
        ok: true,
        msg: "Reserva creada",
        status: 201,
        data: registro,
      });
    })
    .catch((error) => {
      res.status(500).json({
        ok: false,
        msg: "Error al crear la reserva",
        status: 500,
        data: error,
      });
    });
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

  Reserva.update(
    { idUsuario, idHorario },
    { where: { idReserva } }
  )
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
