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
  const { idUsuario, idHorario, fechaReserva } = req.body;

  Reserva.create({
    idUsuario,
    idHorario,
    fechaReserva,
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
