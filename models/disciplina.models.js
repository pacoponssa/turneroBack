module.exports = (sequelize, Sequelize) => {
  const { DataTypes } = Sequelize;
  const Disciplina = sequelize.define(
    "Disciplina",
    {
      idDisciplina: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      nombre: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      descripcion: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      cupoPorTurno: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: "Máximo de alumnos permitidos por turno",
      },
      disponibilidad: {
        type: DataTypes.JSON,
        allowNull: true,
        comment:
          "Ej: [{ dia: 'Lunes', horaInicio: '10:00', horaFin: '11:00' }, ...]",
      },
      valorPorTurno: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 1000,
      },
    },
    {
      timestamps: false,
    }
  );

  return Disciplina;
};
