const express = require("express");
const router = express.Router();
const reservaController = require("../controllers/reserva.controllers");

router.get("/", reservaController.obtenerReservas);
router.get("/:id", reservaController.obtenerReservaPorId);
router.post("/", reservaController.crearReserva);
router.delete("/:id", reservaController.eliminarReserva);
router.put("/:id", reservaController.actualizarReserva);

module.exports = router;
