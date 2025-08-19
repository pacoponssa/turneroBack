// 📁 models/planAlumno.models.js
module.exports = (sequelize, Sequelize) => {
  const { DataTypes } = Sequelize;

  const PlanAlumno = sequelize.define("PlanAlumno", {
    idPlan: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    idUsuario: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    clasesPorSemana: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    mesesPagados: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    fechaInicio: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  }, {
    timestamps: false,
  });

  return PlanAlumno;
};
