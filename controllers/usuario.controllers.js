const db = require("../models/index");
const Usuario = db.Usuario;

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

exports.crearUsuario = (req, res) => {
  const { nombre, email, telefono, contraseña, rol } = req.body;

  Usuario.create({
    nombre,
    email,
    telefono,
    contraseña,
    rol,
  })
    .then((registro) => {
      res.status(201).json({
        ok: true,
        msg: "Usuario creado",
        status: 201,
        data: registro,
      });
    })
    .catch((error) => {
      res.status(500).json({
        ok: false,
        msg: "Error al crear el usuario",
        status: 500,
        data: error,
      });
    });
};

exports.actualizarUsuario = (req, res) => {
  const _id = req.params.id;
  const { nombre, email, telefono, contraseña, rol } = req.body;

  Usuario.update(
    {
      nombre,
      email,
      telefono,
      contraseña,
      rol,
    },
    {
      where: { idUsuario: _id },
    }
  )
    .then((registro) => {
      res.status(200).json({
        ok: true,
        msg: "Usuario actualizado",
        status: 200,
        data: registro,
      });
    })
    .catch((error) => {
      res.status(500).json({
        ok: false,
        msg: "Error al actualizar el usuario",
        status: 500,
        data: error,
      });
    });
};

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
