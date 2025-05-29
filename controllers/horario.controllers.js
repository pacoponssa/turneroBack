const db = require("../models/index");
const Horario = db.Horario;

exports.obtenerHorarios = (req, res) => {
  Horario.findAll()
    .then((registros) => {
      res.status(200).json({
        ok: true,
        msg: "Listado de horarios",
        status: 200,
        data: registros,
      });
    })
    .catch((error) => {
      res.status(500).json({
        ok: false,
        msg: "Error al obtener los horarios",
        status: 500,
        data: error,
      });
    });
};

exports.crearHorario = (req, res) => {
  const { idDisciplina, fecha, horaInicio, horaFin, cupoMaximo } = req.body;

  Horario.create({
    idDisciplina,
    fecha,
    horaInicio,
    horaFin,
    cupoMaximo,
  })
    .then((registro) => {
      res.status(201).json({
        ok: true,
        msg: "Horario creado",
        status: 201,
        data: registro,
      });
    })
    .catch((error) => {
      res.status(500).json({
        ok: false,
        msg: "Error al crear el horario",
        status: 500,
        data: error,
      });
    });
};
