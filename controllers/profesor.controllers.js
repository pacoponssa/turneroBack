const { Usuario, Disciplina, ProfesorDisciplina, Horario } = require("../models");
const { Op } = require("sequelize");



module.exports = {
  // GET /profesores
  obtenerProfesores: async (req, res) => {
    try {
      const profesores = await Usuario.findAll({
        where: { rol: 3 },
        attributes: ["idUsuario", "nombre", "dni", "telefono"]
      });
      res.json(profesores);
    } catch (error) {
      console.error("Error al obtener profesores:", error);
      res.status(500).json({ error: "Error interno del servidor" });
    }
  },

  // POST /profesores/:id/disciplina
  asignarDisciplina: async (req, res) => {
    const { id } = req.params; // id profesor
    const { idDisciplina } = req.body;

    try {
      const profesor = await Usuario.findByPk(id);
      if (!profesor || profesor.rol !== 3) {
        return res.status(404).json({ error: "Profesor no encontrado" });
      }

      await ProfesorDisciplina.create({
        profesor_id: id,
        disciplina_id: idDisciplina,
      });

      res.json({ mensaje: "Disciplina asignada correctamente" });
    } catch (error) {
      console.error("Error al asignar disciplina:", error);
      res.status(500).json({ error: "Error interno" });
    }
  },

  // PUT /profesores/asignar-horario/:idHorario
  asignarProfesorAHorario: async (req, res) => {
    const { idHorario } = req.params;
    const { profesor_id } = req.body;

    try {
      const profesor = await Usuario.findByPk(profesor_id);
      if (!profesor || profesor.rol !== 3) {
        return res.status(404).json({ error: "Profesor no válido" });
      }

      const horario = await Horario.findByPk(idHorario);
      if (!horario) {
        return res.status(404).json({ error: "Horario no encontrado" });
      }

      horario.profesor_id = profesor_id;
      await horario.save();

      res.json({ mensaje: "Profesor asignado al horario correctamente" });
    } catch (error) {
      console.error("Error al asignar profesor:", error);
      res.status(500).json({ error: "Error interno del servidor" });
    }
  }
};

obtenerTurnosDelProfesor: async (req, res) => {
  const { id } = req.params;

  try {
    const profesor = await Usuario.findByPk(id);
    if (!profesor || profesor.rol !== 3) {
      return res.status(404).json({ error: "Profesor no encontrado" });
    }

    const turnos = await Horario.findAll({
      where: { profesor_id: id },
      include: [
        {
          model: Disciplina,
          foreignKey: "idDisciplina",
          attributes: ["idDisciplina", "nombre"]
        }
      ],
      order: [["fecha", "ASC"], ["hora", "ASC"]]
    });

    res.json(turnos);
  } catch (error) {
    console.error("Error al obtener turnos del profesor:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}

calcularSueldo: async (req, res) => {
  const { id } = req.params;
  const { desde, hasta } = req.query;

  try {
    const profesor = await Usuario.findByPk(id);
    if (!profesor || profesor.rol !== 3) {
      return res.status(404).json({ error: "Profesor no válido" });
    }

    // Buscar los turnos del profesor en el rango
    const turnos = await Horario.findAll({
      where: {
        profesor_id: id,
        fecha: {
          [Op.between]: [desde, hasta],
        },
      },
      include: {
        model: Disciplina,
        attributes: ["idDisciplina", "nombre", "valorPorTurno"]
      }
    });

    // Calcular sueldo sumando valorPorTurno de cada turno
    const detalle = turnos.map(turno => ({
      fecha: turno.fecha,
      hora: turno.hora,
      disciplina: turno.Disciplina.nombre,
      valor: parseFloat(turno.Disciplina.valorPorTurno)
    }));

    const total = detalle.reduce((sum, t) => sum + t.valor, 0);

    res.json({
      profesor: profesor.nombre,
      cantidad_turnos: detalle.length,
      total,
      detalle
    });

  } catch (error) {
    console.error("Error al calcular sueldo:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}

