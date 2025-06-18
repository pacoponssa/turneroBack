const db = require("../models/index");
const Usuario = db.Usuario;

// Obtener todos los usuarios
exports.obtenerUsuarios = async (req, res) => {
  try {
    const registros = await Usuario.findAll();
    res.status(200).json({
      ok: true,
      msg: "Listado de usuarios",
      status: 200,
      data: registros,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Error al obtener los usuarios",
      status: 500,
      data: error.message,
    });
  }
};

// Obtener usuario por ID
exports.obtenerUsuarioPorId = async (req, res) => {
  const _id = req.params.id;
  try {
    const registro = await Usuario.findOne({ where: { idUsuario: _id } });
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
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Error al obtener el usuario",
      status: 500,
      data: error.message,
    });
  }
};

// Crear usuario (confía en el hook del modelo para el hash)
exports.crearUsuario = async (req, res) => {
  const { nombre, dni, password, telefono, rol } = req.body;

  try {
    const nuevoUsuario = await Usuario.create({
      nombre,
      dni,
      password, // 👉 lo hashea el hook
      telefono,
      rol,
    });

    res.status(201).json({
      msg: "Usuario creado correctamente",
      data: { idUsuario: nuevoUsuario.idUsuario },
    });
  } catch (error) {
    res.status(500).json({
      msg: "Error al crear el usuario",
      error: error.message,
    });
  }
};

// Actualizar usuario
exports.actualizarUsuario = async (req, res) => {
  const { id } = req.params;
  let { nombre, dni, password, telefono, rol } = req.body;

  try {
    const usuario = await Usuario.findByPk(id);
    if (!usuario) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    // Actualización individual (password será hasheado si cambió, gracias al hook)
    usuario.nombre = nombre ?? usuario.nombre;
    usuario.dni = dni ?? usuario.dni;
    usuario.telefono = telefono ?? usuario.telefono;
    usuario.rol = rol ?? usuario.rol;
    if (password) {
      usuario.password = password; // 👉 también será hasheado por el hook
    }

    await usuario.save();

    res.status(200).json({ message: "Usuario actualizado", data: usuario });
  } catch (error) {
    res.status(500).json({
      message: "Error al actualizar usuario",
      error: error.message,
    });
  }
};

// Eliminar usuario
exports.eliminarUsuario = async (req, res) => {
  const _id = req.params.id;
  try {
    const result = await Usuario.destroy({ where: { idUsuario: _id } });
    res.status(200).json({
      ok: true,
      msg: "Usuario eliminado",
      status: 200,
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Error al eliminar el usuario",
      status: 500,
      data: error.message,
    });
  }
};
