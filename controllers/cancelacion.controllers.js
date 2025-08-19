const db = require("../models/index");
const Cancelacion = db.Cancelacion;
const Reserva = db.Reserva;
const Horario = db.Horario;
const Disciplina = db.Disciplina;
const Usuario = db.Usuario;

exports.cancelarReserva = async (req, res) => {
  const { idReserva, motivo } = req.body;

  try {
    // Verificar si ya fue cancelada
    const yaCancelada = await Cancelacion.findOne({ where: { idReserva } });
    if (yaCancelada) {
      return res.status(400).json({ msg: "La reserva ya fue cancelada" });
    }

    // Crear cancelación
    const nuevaCancelacion = await Cancelacion.create({ idReserva, motivo });

    // (Opcional) Actualizar estado de reserva si tenés un campo `cancelada`
    // await Reserva.update({ cancelada: true }, { where: { idReserva } });

    res.status(201).json({
      msg: "Reserva cancelada exitosamente",
      data: nuevaCancelacion,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Error al cancelar la reserva",
      error: error.message,
    });
  }
};



exports.obtenerCancelaciones = async (req, res) => {
  try {
    const cancelaciones = await Cancelacion.findAll({
      include: [
        {
          model: Reserva,
          include: [
            {
              model: Usuario,
              attributes: ["idUsuario", "nombre", "dni"],
            },
            {
              model: Horario,
              include: [{ model: Disciplina, attributes: ["nombre"] }],
            },
          ],
        },
      ],
      order: [["idCancelacion", "DESC"]],
    });

    res.status(200).json({ data: cancelaciones });
  } catch (error) {
    res.status(500).json({ msg: "Error al obtener cancelaciones", error });
  }
};