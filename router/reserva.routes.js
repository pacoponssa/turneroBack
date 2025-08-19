const express = require("express");
const router = express.Router();
const reservaController = require("../controllers/reserva.controllers");


router.put("/cancelar/:id", reservaController.cancelarReserva);

router.get("/", reservaController.obtenerReservas);
router.get("/:id", reservaController.obtenerReservaPorId);
router.get("/usuario/:id", reservaController.obtenerReservasPorUsuario);
// router.get("/disciplina/:id", reservaController.obtenerReservasPorDisciplina);
// router.get("/horario/:id", reservaController.obtenerReservasPorHorario);
router.post("/", reservaController.crearReserva);
router.delete("/:id", reservaController.eliminarReserva);
router.put("/:id", reservaController.actualizarReserva);

module.exports = router;
