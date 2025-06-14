//para la inscripción a un turno específico (relación usuario-horario).
// models/Inscripcion.js
module.exports = (sequelize, Sequelize) => {
  const { DataTypes } = Sequelize;

  const Inscripcion = sequelize.define(
    "Inscripcion",
    {
      idInscripcion: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      fechaInscripcion: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      HorarioIdHorario: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      idUsuario: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      timestamps: false,
      indexes: [
        {
          unique: true,
          fields: ["idUsuario", "HorarioIdHorario"],
        },
      ],
    }
  );

  return Inscripcion;
};
