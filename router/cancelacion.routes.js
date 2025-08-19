const express = require("express");
const router = express.Router();
const cancelacionController = require("../controllers/cancelacion.controllers");

router.get("/", cancelacionController.obtenerCancelaciones);

router.post("/", cancelacionController.cancelarReserva);

module.exports = router;
