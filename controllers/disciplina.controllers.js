const db = require("../models/index");
const Disciplina = db.Disciplina;

exports.obtenerDisciplinas = (req, res) => {
  Disciplina.findAll()
    .then((registros) => {
      res.status(200).json({
        ok: true,
        msg: "Listado de disciplinas",
        status: 200,
        data: registros,
      });
    })
    .catch((error) => {
      res.status(500).json({
        ok: false,
        msg: "Error al obtener las disciplinas",
        status: 500,
        data: error,
      });
    });
};

exports.crearDisciplina = (req, res) => {
  const { nombre, descripcion } = req.body;

  Disciplina.create({
    nombre,
    descripcion,
  })
    .then((registro) => {
      res.status(201).json({
        ok: true,
        msg: "Disciplina creada",
        status: 201,
        data: registro,
      });
    })
    .catch((error) => {
      res.status(500).json({
        ok: false,
        msg: "Error al crear la disciplina",
        status: 500,
        data: error,
      });
    });
};
