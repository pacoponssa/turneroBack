module.exports = (sequelize, Sequelize) => {
  const { DataTypes } = Sequelize;
  const Cancelacion = sequelize.define(
    "Cancelacion",
    {
      idCancelacion: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      motivo: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      timestamps: true, // para tener fecha de cancelación
    }
  );

  return Cancelacion;
};
