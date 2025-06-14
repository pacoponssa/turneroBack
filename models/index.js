const Sequelize = require("sequelize");
const sequelize = require("./sequelize");

// Importar modelos
const Usuario = require("./usuario.models")(sequelize, Sequelize);
const Disciplina = require("./disciplina.models")(sequelize, Sequelize);
const Horario = require("./horario.models")(sequelize, Sequelize);
const Reserva = require("./reserva.models")(sequelize, Sequelize);
const Cancelacion = require("./cancelacion.models")(sequelize, Sequelize);
const Inscripcion = require("./inscripcion.models")(sequelize, Sequelize);

// Relaciones

Inscripcion.belongsTo(Usuario, { foreignKey: "idUsuario" });
Usuario.hasMany(Inscripcion, { foreignKey: "idUsuario" });

Inscripcion.belongsTo(Horario, { foreignKey: "HorarioIdHorario" });
Horario.hasMany(Inscripcion, { foreignKey: "HorarioIdHorario" });

Disciplina.hasMany(Horario, { foreignKey: "idDisciplina" });
Horario.belongsTo(Disciplina, { foreignKey: "idDisciplina" });

Usuario.hasMany(Reserva, { foreignKey: "idUsuario" });
Reserva.belongsTo(Usuario, { foreignKey: "idUsuario" });

Horario.hasMany(Reserva, { foreignKey: "idHorario" });
Reserva.belongsTo(Horario, { foreignKey: "idHorario" });

Reserva.hasOne(Cancelacion, { foreignKey: "idReserva" });
Cancelacion.belongsTo(Reserva, { foreignKey: "idReserva" });

Usuario.belongsToMany(Disciplina, {
  through: "inscripciones_usuarios",
  foreignKey: "idUsuario",
  otherKey: "idDisciplina",
});

Disciplina.belongsToMany(Usuario, {
  through: "inscripciones_usuarios",
  foreignKey: "idDisciplina",
  otherKey: "idUsuario",
});

module.exports = {
  sequelize,
  Sequelize,
  Usuario,
  Disciplina,
  Horario,
  Reserva,
  Cancelacion,
  Inscripcion,
};
