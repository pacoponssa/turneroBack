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


exports.crearUsuario = async (req, res) => {
  try {
    let { nombre, email, telefono, password, rol } = req.body;

    // Convertir el rol si viene como string
    if (typeof rol === 'string') {
      rol = rol.toLowerCase() === 'admin' ? 2 : 1;
    }

    // Validar rol
    if (![1, 2].includes(rol)) {
      return res.status(400).json({
        ok: false,
        msg: 'Rol inválido. Use 1 (usuario), 2 (admin), o sus equivalentes como texto.',
      });
    }

    const nuevoUsuario = await db.Usuario.create({
      nombre,
      email,
      telefono,
      password,
      rol,
    });

    res.status(201).json({
      ok: true,
      msg: 'Usuario creado correctamente',
      data: nuevoUsuario,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: 'Error al crear el usuario',
      data: error.message,
    });
  }
};


exports.crearUsuario = (req, res) => {
  const { nombre, email, telefono, password, rol } = req.body;

  Usuario.create({
    nombre,
    email,
    telefono,
    password,
    rol   
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
  const { nombre, email, telefono, password, rol } = req.body;

  Usuario.update(
    {
      nombre,
      email,
      telefono,
      password,
      rol
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
