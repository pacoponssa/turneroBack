const express = require("express");
const router = express.Router();
const UsuarioController = require('../controllers/usuario.controllers');

// CRUD

// C Create
router.post('/', UsuarioController.crearUsuario );
// R  Read
router.get('/', UsuarioController.obtenerUsuarios );
router.get('/:id', UsuarioController.obtenerUsuarioPorId );
// Rutas.get('/usuario/:disponible', UsuarioController.obtenerProductoDisponible);
// U Update
router.put('/:id', UsuarioController.actualizarUsuario );
// D Delete
router.delete('/:id', UsuarioController.eliminarUsuario );

module.exports = router;