module.exports = (app) => {
     
 
    const rutasDisciplina = require("./disciplina.routes");
    app.use("/disciplina", rutasDisciplina);

    const rutasHorario = require("./horario.routes");
    app.use("/horario", rutasHorario);

    const rutasReserva = require("./reserva.routes");
    app.use("/reserva", rutasReserva);

    const rutasCancelacion = require("./cancelacion.routes");
    app.use("/cancelacion", rutasCancelacion);

};