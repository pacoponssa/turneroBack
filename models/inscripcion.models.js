// models/Inscripcion.js
module.exports = (sequelize, Sequelize) => {
  const { DataTypes } = Sequelize;

  const Inscripcion = sequelize.define("Inscripcion", {
    idInscripcion: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    fechaInscripcion: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    idDisciplina: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    idUsuario: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    timestamps: false,
    indexes: [
      {
        unique: true,
        fields: ['idUsuario', 'idDisciplina']
      }
    ]
  });

  return Inscripcion;
};
