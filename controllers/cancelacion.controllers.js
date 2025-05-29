const db = require("../models/index");
const Cancelacion = db.Cancelacion;

exports.obtenerCancelaciones = (req, res) => {
  Cancelacion.findAll()
    .then((registros) => {
      res.status(200).json({
        ok: true,
        msg: "Listado de cancelaciones",
        status: 200,
        data: registros,
      });
    })
    .catch((error) => {
      res.status(500).json({
        ok: false,
        msg: "Error al obtener las cancelaciones",
        status: 500,
        data: error,
      });
    });
};

exports.crearCancelacion = (req, res) => {
  const { idReserva, motivo, fechaCancelacion } = req.body;

  Cancelacion.create({
    idReserva,
    motivo,
    fechaCancelacion,
  })
    .then((registro) => {
      res.status(201).json({
        ok: true,
        msg: "Cancelación creada",
        status: 201,
        data: registro,
      });
    })
    .catch((error) => {
      res.status(500).json({
        ok: false,
        msg: "Error al crear la cancelación",
        status: 500,
        data: error,
      });
    });
};
