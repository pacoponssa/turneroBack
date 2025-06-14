module.exports = (app) => {
  const rutasUsuario = require("./usuario.routes");
  app.use("/usuarios", rutasUsuario);

  const rutasDisciplina = require("./disciplina.routes");
  app.use("/disciplina", rutasDisciplina);

  const rutasHorario = require("./horario.routes");
  app.use("/horario", rutasHorario);

  const rutasReserva = require("./reserva.routes");
  app.use("/reserva", rutasReserva);

  const rutasCancelacion = require("./cancelacion.routes");
  app.use("/cancelacion", rutasCancelacion);

  const rutasAuth = require("./auth.routes");
  app.use("/auth", rutasAuth);

  const rutasAI = require("./ai.routes");
  app.use("/api", rutasAI);

  // 👇 Asignación de disciplinas (Admin)
  const rutasInscripcion = require("./inscripcion.routes");
  app.use("/inscripcion", rutasInscripcion);

  // 👇 Inscripciones a horarios (Alumno)
  const rutasInscripciones = require("./inscripciones.routes");
  app.use("/inscripciones", rutasInscripciones);
};
