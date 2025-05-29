module.exports = (sequelize, Sequelize) => {

    const { DataTypes } = Sequelize;
    const Reserva = sequelize.define("Reserva", {

        idReserva: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },

        idUsuario: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },

        idHorario: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },

        fechaReserva: {
            type: DataTypes.DATE,
            allowNull: false,
        }
    });

    return Reserva;
}
