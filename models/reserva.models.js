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
      cancelada: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      timestamps: false,
    }
  );

  return Reserva;
};
