module.exports = (sequelize, Sequelize) => {

    const { DataTypes } = Sequelize;
    const Cancelacion = sequelize.define("Cancelacion", {

        idCancelacion: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        
        motivo: {
            type: DataTypes.TEXT,
            allowNull: true,
        },

        fechaCancelacion: {
            type: DataTypes.DATE,
            allowNull: false,
        }
    });

    return Cancelacion;
}
