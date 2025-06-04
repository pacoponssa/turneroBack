const db = require("../models/index");
const Horario = db.Horario;

exports.obtenerHorarios = (req, res) => {
  Horario.findAll({
    include: {
      model: db.Disciplina,
      attributes: ['nombre'],
    },
  })
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

exports.eliminarHorario = (req, res) => {
  const idHorario = req.params.id;

  Horario.destroy({ where: { idHorario } })
    .then((resultado) => {
      if (resultado) {
        res.status(200).json({
          ok: true,
          msg: "Horario eliminado",
          status: 200,
        });
      } else {
        res.status(404).json({
          ok: false,
          msg: "Horario no encontrado",
          status: 404,
        });
      }
    })
    .catch((error) => {
      res.status(500).json({
        ok: false,
        msg: "Error al eliminar el horario",
        status: 500,
        data: error,
      });
    });
};

exports.actualizarHorario = (req, res) => {
  const idHorario = req.params.id;
  const { idDisciplina, fecha, horaInicio, horaFin, cupoMaximo } = req.body;

  Horario.update(
    { idDisciplina, fecha, horaInicio, horaFin, cupoMaximo },
    { where: { idHorario } }
  )
    .then((resultado) => {
      if (resultado[0]) {
        res.status(200).json({
          ok: true,
          msg: "Horario actualizado",
          status: 200,
        });
      } else {
        res.status(404).json({
          ok: false,
          msg: "Horario no encontrado",
          status: 404,
        });
      }
    })
    .catch((error) => {
      res.status(500).json({
        ok: false,
        msg: "Error al actualizar el horario",
        status: 500,
        data: error,
      });
    });
};
