const db = require("../models/index");
const PlanAlumno = db.PlanAlumno;
const Disciplina = db.Disciplina;
const Horario = db.Horario;
const Reserva = db.Reserva;
const Inscripcion = db.Inscripcion;
const Usuario = db.Usuario;

// Crear nuevo plan
exports.crearPlan = async (req, res) => {
  const { idUsuario, clasesPorSemana, mesesPagados, fechaInicio } = req.body;

  try {
    const nuevoPlan = await PlanAlumno.create({
      idUsuario,
      clasesPorSemana,
      mesesPagados: mesesPagados || 1,
      fechaInicio: fechaInicio || new Date().toISOString().split("T")[0],
    });

    res.status(201).json({
      msg: "Plan creado correctamente",
      data: nuevoPlan,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Error al crear el plan",
      error: error.message,
    });
  }
};

// Obtener todos los planes
exports.obtenerPlanes = async (req, res) => {
  try {
    const planes = await PlanAlumno.findAll({
      include: [{ model: Usuario, attributes: ["nombre", "dni"] }],
    });

    res.status(200).json({ data: planes });
  } catch (error) {
    res.status(500).json({ msg: "Error al obtener los planes", error });
  }
};

// Obtener plan por ID
exports.obtenerPlanPorId = async (req, res) => {
  try {
    const idUsuario = req.params.id;

    // Buscar el plan del usuario
    const plan = await PlanAlumno.findOne({
      where: { idUsuario },
      include: [{ model: Usuario, attributes: ["nombre", "dni"] }],
    });

    if (!plan) {
      return res.status(404).json({ msg: "Plan no encontrado" });
    }

    // Contar la cantidad de reservas activas (no canceladas)
    const reservas = await db.Reserva.count({
      where: {
        idUsuario,
      },
      include: [
        {
          model: db.Cancelacion,
          required: false, // permite LEFT JOIN
          where: { idReserva: null }, // solo reservas sin cancelación
        },
      ],
    });

    // Calcular clases totales según el plan
    const clasesPorSemana = plan.clasesPorSemana;
    const meses = plan.mesesPagados || 1;
    const totalClases = clasesPorSemana * 4 * meses;

    const resumen = {
      nombre: plan.Usuario.nombre,
      dni: plan.Usuario.dni,
      clasesPorSemana,
      mesesPagados: meses,
      totalClases,
      clasesReservadas: reservas,
      clasesRestantes: totalClases - reservas,
    };

    res.status(200).json({ data: resumen });
  } catch (error) {
    res.status(500).json({ msg: "Error al obtener el plan del alumno", error });
  }
};

// Actualizar plan
exports.actualizarPlan = async (req, res) => {
  const { id } = req.params;
  const { clasesPorSemana, mesesPagados, fechaInicio } = req.body;

  try {
    const plan = await PlanAlumno.findByPk(id);
    if (!plan) {
      return res.status(404).json({ msg: "Plan no encontrado" });
    }

    await plan.update({
      clasesPorSemana,
      mesesPagados,
      fechaInicio,
    });

    res.status(200).json({ msg: "Plan actualizado", data: plan });
  } catch (error) {
    res.status(500).json({ msg: "Error al actualizar plan", error });
  }
};

// Eliminar plan
exports.eliminarPlan = async (req, res) => {
  try {
    const rowsDeleted = await PlanAlumno.destroy({
      where: { idPlan: req.params.id },
    });

    if (rowsDeleted === 0) {
      return res.status(404).json({ msg: "Plan no encontrado" });
    }

    res.status(200).json({ msg: "Plan eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ msg: "Error al eliminar el plan", error });
  }
};

// Obtener cantidad total de clases pagas de un usuario
exports.obtenerClasesDisponibles = async (req, res) => {
  try {
    const planes = await PlanAlumno.findAll({
      where: { idUsuario: req.params.idUsuario },
    });

    const total = planes.reduce(
      (sum, p) => sum + p.clasesPorSemana * p.mesesPagados * 4,
      0
    ); // 4 semanas por mes

    res.status(200).json({ clasesTotales: total });
  } catch (error) {
    res
      .status(500)
      .json({ msg: "Error al calcular clases disponibles", error });
  }
};

// Crear plan y generar reservas automáticamente
exports.crearPlanConReservas = async (req, res) => {
  const { idUsuario, clasesPorSemana, mesesPagados } = req.body;
  const semanas = mesesPagados * 4;
  const totalClases = clasesPorSemana * semanas;

  try {
    // Crear el plan
    const nuevoPlan = await PlanAlumno.create({ idUsuario, clasesPorSemana, mesesPagados });

    // Buscar disciplinas asignadas al usuario
    const inscripciones = await Inscripcion.findAll({ where: { idUsuario }, include: Disciplina });
    const disciplinas = inscripciones.map(i => i.Disciplina);

    if (disciplinas.length === 0) {
      return res.status(400).json({ msg: "El alumno no tiene disciplinas asignadas" });
    }

    // Obtener los horarios disponibles de las disciplinas asignadas
    const horarios = await Horario.findAll({
      where: {
        idDisciplina: disciplinas.map(d => d.idDisciplina),
      },
      order: [['fecha', 'ASC'], ['horaInicio', 'ASC']]
    });

    // Filtrar solo los horarios futuros y disponibles
    const hoy = new Date();
    const horariosDisponibles = horarios.filter(h => new Date(h.fecha) >= hoy);

    // Asignar clases hasta completar el total del plan
    const reservasAcrear = [];
    let clasesAgregadas = 0;

    for (const h of horariosDisponibles) {
      if (clasesAgregadas >= totalClases) break;
      reservasAcrear.push({
        idUsuario,
        idHorario: h.idHorario,
        cancelada: false,
      });
      clasesAgregadas++;
    }

    if (reservasAcrear.length === 0) {
      return res.status(400).json({ msg: "No hay suficientes turnos disponibles para generar reservas" });
    }

    await Reserva.bulkCreate(reservasAcrear);

    res.status(201).json({
      msg: "Plan creado y reservas generadas",
      plan: nuevoPlan,
      totalReservas: reservasAcrear.length,
    });
  } catch (error) {
    console.error("Error al crear plan y reservas:", error);
    res.status(500).json({ msg: "Error al crear plan y reservas", error });
  }
};
