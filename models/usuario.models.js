const bcrypt = require("bcrypt");

module.exports = (sequelize, Sequelize) => {
  const { DataTypes } = Sequelize;

  const Usuario = sequelize.define(
    "Usuario",
    {
      idUsuario: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      nombre: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      dni: {
        type: DataTypes.STRING(20),
        allowNull: false,
        unique: true,
      },
      telefono: {
        type: DataTypes.STRING(15),
        allowNull: true,
      },
      password: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      rol: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
    },
    {
      timestamps: false,
      hooks: {
        beforeCreate: async (usuario) => {
          console.log("🔥 beforeCreate ejecutado");
          if (usuario.password) {
            const salt = await bcrypt.genSalt(10);
            usuario.password = await bcrypt.hash(usuario.password, salt);
          }
        },
        beforeUpdate: async (usuario) => {
          if (usuario.changed("password")) {
            console.log("🔥 beforeUpdate ejecutado");
            const salt = await bcrypt.genSalt(10);
            usuario.password = await bcrypt.hash(usuario.password, salt);
          }
        },
      },
    }
  );

  return Usuario;
};
