module.exports = (sequelize, Sequelize) => {
  const { DataTypes } = Sequelize;

  const Horario = sequelize.define("Horario", {
    idHorario: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    fecha: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    horaInicio: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    horaFin: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    cupoMaximo: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    // Agregamos manualmente la FK con allowNull: true
    idDisciplina: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },{
        timestamps: false, 
    });

  return Horario;F
};
