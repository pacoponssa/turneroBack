// routes/aiRoutes.js
const express = require('express');
const router = express.Router();
const aiController = require('../controllers/aiController');

// Definimos una ruta POST para /ask
// Se espera que la pregunta venga en el body de la petición como JSON: { "question": "Tu pregunta aquí" }
router.post('/ask', aiController.askQuestion);

module.exports = router;