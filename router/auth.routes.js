const express = require("express");
const router = express.Router();
const { login, register, refreshToken } = require("../controllers/auth.controllers");


// paso 1 - registrarnos
router.post('/register', register); 

// paso 2 - loguearnos
router.post('/login', login);

// paso 3 - cuando se requiera, se puede generar un nuevo token
router.post('/refresh', refreshToken);


module.exports = router;
