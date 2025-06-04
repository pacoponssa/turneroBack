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
    exports.eliminarDisciplina = (req, res) => {
      const _id = req.params.id;

      Disciplina.destroy({
        where: { idDisciplina: _id },
      })
        .then((resultado) => {
          if (resultado > 0) {
            res.status(200).json({
              ok: true,
              msg: "Disciplina eliminada",
              status: 200,
              data: null,
            });
          } else {
            res.status(404).json({
              ok: false,
              msg: "Disciplina no encontrada",
              status: 404,
              data: null,
            });
          }
        })
        .catch((error) => {
          res.status(500).json({
            ok: false,
            msg: "Error al eliminar la disciplina",
            status: 500,
            data: error,
          });
        });
    };

    exports.actualizarDisciplina = (req, res) => {
      const _id = req.params.id;
      const { nombre, descripcion } = req.body;

      Disciplina.update(
        { nombre, descripcion },
        { where: { idDisciplina: _id } }
      )
        .then((resultado) => {
          if (resultado[0] > 0) {
            res.status(200).json({
              ok: true,
              msg: "Disciplina actualizada",
              status: 200,
              data: null,
            });
          } else {
            res.status(404).json({
              ok: false,
              msg: "Disciplina no encontrada",
              status: 404,
              data: null,
            });
          }
        })
        .catch((error) => {
          res.status(500).json({
            ok: false,
            msg: "Error al actualizar la disciplina",
            status: 500,
            data: error,
          });
        });
    };  

