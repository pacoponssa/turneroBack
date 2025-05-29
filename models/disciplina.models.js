module.exports = (sequelize, Sequelize) => {

    const { DataTypes } = Sequelize;
    const Disciplina = sequelize.define("Disciplina", {

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
        }
    });

    return Disciplina;
}
