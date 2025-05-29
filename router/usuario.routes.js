const Rutas = require('express').Router();
const controladorUsuario = require('../controllers/usuario.controllers');

// CRUD

// C Create
Rutas.post('/', controladorUsuario.crearUsuario );
// R  Read
Rutas.get('/', controladorUsuario.obtenerUsuarios );
Rutas.get('/:id', controladorUsuario.obtenerUsuarioPorId );
// Rutas.get('/usuario/:disponible', controladorUsuario.obtenerProductoDisponible);
// U Update
Rutas.put('/:id', controladorUsuario.actualizarUsuario );
// D Delete
Rutas.delete('/:id', controladorUsuario.eliminarUsuario );

module.exports = Rutas;