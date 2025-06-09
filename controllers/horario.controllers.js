const db = require("../models/index");
const Horario = db.Horario;
const Disciplina = db.Disciplina;

exports.obtenerHorarios = async (req, res) => {
  try {
    // Traemos todos los horarios con su disciplina asociada
    const horarios = await db.Horario.findAll({
      include: {
        model: db.Disciplina,
        attributes: ['nombre', 'cupoPorTurno'],
      },
    });

    // Traemos todas las reservas agrupadas por horario
    const reservas = await db.Reserva.findAll({
      attributes: ['idHorario', [db.sequelize.fn('COUNT', 'idReserva'), 'cantidad']],
      group: ['idHorario'],
      raw: true,
    });

    // Convertimos las reservas en un objeto para fácil acceso
    const reservasPorHorario = {};
    reservas.forEach(r => {
      reservasPorHorario[r.idHorario] = parseInt(r.cantidad);
    });

    // Mapeamos los horarios agregando cantidad de reservas y si hay cupo
    const horariosConReservas = horarios.map(h => {
      const reservasHechas = reservasPorHorario[h.idHorario] || 0;
      const cupoMaximo = h.Disciplina?.cupoPorTurno || 0;
      const disponible = reservasHechas < cupoMaximo;

      return {
        ...h.toJSON(),
        reservasHechas,
        cupoMaximo,
        disponible
      };
    });

    res.status(200).json({
      ok: true,
      msg: "Listado de horarios con cupo",
      status: 200,
      data: horariosConReservas,
    });

  } catch (error) {
    console.error("Error al obtener horarios:", error); 
    res.status(500).json({
      ok: false,
      msg: "Error al obtener los horarios",
      status: 500,
      data: error.message || error,
    });
  }
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

exports.obtenerHorarioPorId = (req, res) => {
  const idHorario = req.params.id;

  Horario.findOne({
    where: { idHorario },
    include: {
      model: db.Disciplina,
      attributes: ['nombre'],
    },
  })
    .then((registro) => {
      if (registro) {
        res.status(200).json({
          ok: true,
          msg: "Horario encontrado",
          status: 200,
          data: registro,
        });
      } else {
        res.status(404).json({
          ok: false,
          msg: "Horario no encontrado",
          status: 404,
          data: null,
        });
      }
    })
    .catch((error) => {
      res.status(500).json({
        ok: false,
        msg: "Error al obtener el horario",
        status: 500,
        data: error,
      });
    });
};
