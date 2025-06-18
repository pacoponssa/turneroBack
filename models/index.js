
const Sequelize = require("sequelize");
const sequelize = require("./sequelize");

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Importar modelos
db.Usuario = require("./usuario.models")(sequelize, Sequelize);
db.Disciplina = require("./disciplina.models")(sequelize, Sequelize);
db.Horario = require("./horario.models")(sequelize, Sequelize);
db.Reserva = require("./reserva.models")(sequelize, Sequelize);
db.Cancelacion = require("./cancelacion.models")(sequelize, Sequelize);
db.Inscripcion = require("./inscripcion.models")(sequelize, Sequelize);
db.InscripcionUsuario = require("./inscripcionUsuario.models")(
  sequelize,
  Sequelize
);

// Relaciones

// Inscripción a horarios (turnos)
db.Inscripcion.belongsTo(db.Usuario, { foreignKey: "idUsuario" });
db.Usuario.hasMany(db.Inscripcion, { foreignKey: "idUsuario" });

db.Inscripcion.belongsTo(db.Horario, { foreignKey: "HorarioIdHorario" });
db.Horario.hasMany(db.Inscripcion, { foreignKey: "HorarioIdHorario" });

// Horarios por disciplina
db.Disciplina.hasMany(db.Horario, { foreignKey: "idDisciplina" });
db.Horario.belongsTo(db.Disciplina, { foreignKey: "idDisciplina" });

// Reservas
db.Usuario.hasMany(db.Reserva, { foreignKey: "idUsuario" });
db.Reserva.belongsTo(db.Usuario, { foreignKey: "idUsuario" });

db.Horario.hasMany(db.Reserva, { foreignKey: "idHorario" });
db.Reserva.belongsTo(db.Horario, { foreignKey: "idHorario" });

// Cancelaciones
db.Reserva.hasOne(db.Cancelacion, { foreignKey: "idReserva" });
db.Cancelacion.belongsTo(db.Reserva, { foreignKey: "idReserva" });

// Disciplinas asignadas a usuarios (relación N:N)
db.Usuario.belongsToMany(db.Disciplina, {
  through: db.InscripcionUsuario,
  foreignKey: "idUsuario",
  otherKey: "idDisciplina",
  as: "Disciplinas", // 👈 NECESARIO
});

db.Disciplina.belongsToMany(db.Usuario, {
  through: db.InscripcionUsuario,
  foreignKey: "idDisciplina",
  otherKey: "idUsuario",
  as: "Usuario", // 👈 opcional pero recomendable para simetría
});

module.exports = db;
console.log("🔥 Modelos cargados y relaciones establecidas correctamente");

