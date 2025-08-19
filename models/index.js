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
db.InscripcionUsuario = require("./inscripcionUsuario.models")(sequelize, Sequelize);
db.PlanAlumno = require("./planAlumno.models")(sequelize, Sequelize);
db.ProfesorDisciplina = require("./profesorDisciplina.models")(sequelize, Sequelize);

// ====================== RELACIONES ====================== //

// Usuario ↔ Inscripción
db.Inscripcion.belongsTo(db.Usuario, { foreignKey: "idUsuario" });
db.Usuario.hasMany(db.Inscripcion, { foreignKey: "idUsuario" });

// Horario ↔ Inscripción
db.Inscripcion.belongsTo(db.Horario, { foreignKey: "HorarioIdHorario" });
db.Horario.hasMany(db.Inscripcion, { foreignKey: "HorarioIdHorario" });

// Disciplina ↔ Horario
db.Disciplina.hasMany(db.Horario, { foreignKey: "idDisciplina" });
db.Horario.belongsTo(db.Disciplina, { foreignKey: "idDisciplina" });

// Usuario ↔ Reserva
db.Usuario.hasMany(db.Reserva, { foreignKey: "idUsuario" });
db.Reserva.belongsTo(db.Usuario, { foreignKey: "idUsuario" });

// Horario ↔ Reserva
db.Horario.hasMany(db.Reserva, { foreignKey: "idHorario" });
db.Reserva.belongsTo(db.Horario, { foreignKey: "idHorario" });

// Reserva ↔ Cancelación
db.Reserva.hasOne(db.Cancelacion, { foreignKey: "idReserva" });
db.Cancelacion.belongsTo(db.Reserva, { foreignKey: "idReserva" });

// Usuario ↔ Disciplinas (por inscripción general)
db.Usuario.belongsToMany(db.Disciplina, {
  through: db.InscripcionUsuario,
  foreignKey: "idUsuario",
  otherKey: "idDisciplina",
  as: "Disciplinas",
});

db.Disciplina.belongsToMany(db.Usuario, {
  through: db.InscripcionUsuario,
  foreignKey: "idDisciplina",
  otherKey: "idUsuario",
  as: "Usuarios",
});

// Usuario ↔ Disciplinas (por profesor)
db.Usuario.belongsToMany(db.Disciplina, {
  through: db.ProfesorDisciplina,
  foreignKey: "profesor_id",
  otherKey: "disciplina_id",
  as: "disciplinas", // disciplinas que da el profesor
});

db.Disciplina.belongsToMany(db.Usuario, {
  through: db.ProfesorDisciplina,
  foreignKey: "disciplina_id",
  otherKey: "profesor_id",
  as: "profesores",
});

// Usuario ↔ PlanAlumno
db.Usuario.hasMany(db.PlanAlumno, { foreignKey: "idUsuario" });
db.PlanAlumno.belongsTo(db.Usuario, { foreignKey: "idUsuario" });

// Horario ↔ Profesor (nuevo campo profesor_id en Horario)
db.Usuario.hasMany(db.Horario, { foreignKey: "profesor_id", as: "turnosDictados" });
db.Horario.belongsTo(db.Usuario, { foreignKey: "profesor_id", as: "profesor" });

module.exports = db;

console.log("🔥 Modelos cargados y relaciones establecidas correctamente");
