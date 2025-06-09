module.exports = (sequelize, Sequelize) => {
  const { DataTypes } = Sequelize;
  const Reserva = sequelize.define(
    "Reserva",
    {
      idReserva: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
    },
    {
      timestamps: false,
    }
  );

  return Reserva;
};
