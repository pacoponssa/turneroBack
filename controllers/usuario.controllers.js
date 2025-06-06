const db = require("../models/index");
const Usuario = db.Usuario;
const { registerUser } = require("../controllers/auth.service");
const bcrypt = require("bcrypt");

// Obtener todos los usuarios
exports.obtenerUsuarios = (req, res) => {
  Usuario.findAll()
    .then((registros) => {
      res.status(200).json({
        ok: true,
        msg: "Listado de usuarios",
        status: 200,
        data: registros,
      });
    })
    .catch((error) => {
      res.status(500).json({
        ok: false,
        msg: "Error al obtener los usuarios",
        status: 500,
        data: error,
      });
    });
};

// Obtener usuario por ID
exports.obtenerUsuarioPorId = (req, res) => {
  const _id = req.params.id;

  Usuario.findOne({
    where: { idUsuario: _id },
  })
    .then((registro) => {
      if (registro) {
        res.status(200).json({
          ok: true,
          msg: "Usuario encontrado",
          status: 200,
          data: registro,
        });
      } else {
        res.status(404).json({
          ok: false,
          msg: "Usuario no encontrado",
          status: 404,
          data: null,
        });
      }
    })
    .catch((error) => {
      res.status(500).json({
        ok: false,
        msg: "Error al obtener el usuario",
        status: 500,
        data: error,
      });
    });
};

// Crear usuario (usando registerUser con encriptación incluida)
exports.crearUsuario = async (req, res) => {
  const { nombre, email, password, telefono, rol } = req.body;

  try {
    // Se usa el método centralizado que incluye validaciones y encriptado
    const nuevoUsuario = await registerUser(email, password, nombre, telefono, rol);

    res.status(201).json({
      message: "Usuario creado exitosamente",
      data: nuevoUsuario,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al crear usuario",
      error: error.message,
    });
  }
};

// Actualizar usuario
exports.actualizarUsuario = async (req, res) => {
  const { id } = req.params;
  let { nombre, email, password, telefono, rol } = req.body;

  try {
    const usuario = await Usuario.findByPk(id);
    if (!usuario) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    // Si se envió una nueva contraseña, se encripta
    if (password) {
      password = await bcrypt.hash(password, 10);
    }

    // Se actualizan todos los campos que hayan llegado
    await usuario.update({
      nombre,
      email,
      telefono,
      rol,
      ...(password && { password }), // Se actualiza password solo si vino
    });

    res.status(200).json({ message: "Usuario actualizado", data: usuario });
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar usuario", error: error.message });
  }
};

// Eliminar usuario
exports.eliminarUsuario = (req, res) => {
  const _id = req.params.id;

  Usuario.destroy({
    where: { idUsuario: _id },
  })
    .then((registro) => {
      res.status(200).json({
        ok: true,
        msg: "Usuario eliminado",
        status: 200,
        data: registro,
      });
    })
    .catch((error) => {
      res.status(500).json({
        ok: false,
        msg: "Error al eliminar el usuario",
        status: 500,
        data: error,
      });
    });
};
