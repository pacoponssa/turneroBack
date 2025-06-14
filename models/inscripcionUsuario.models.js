//para la relación de disciplinas asignadas a un alumno (tabla intermedia para N:N).
// models/InscripcionUsuario.js
module.exports = (sequelize, DataTypes) => {
  return sequelize.define("InscripcionUsuario", {
    idUsuario: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    idDisciplina: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
  }, {
    tableName: "inscripciones_usuarios",
    timestamps: false,
  });
};
