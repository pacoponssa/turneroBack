const bcrypt = require("bcrypt");
const db = require("../models/index");
const Usuario = db.Usuario;

(async () => {
  try {
    // Obtiene todos los usuarios
    const usuarios = await Usuario.findAll();

    for (const usuario of usuarios) {
      // Verifica si la contraseña ya está encriptada
      const isEncrypted = usuario.password.startsWith("$2b$");

      if (!isEncrypted) {
        // Encripta la contraseña
        const hashedPassword = await bcrypt.hash(usuario.password, 10);

        // Actualiza la contraseña en la base de datos
        await Usuario.update(
          { password: hashedPassword },
          { where: { id: usuario.id } }
        );

        console.log(`Contraseña encriptada para el usuario con ID: ${usuario.id}`);
      } else {
        console.log(`La contraseña del usuario con ID: ${usuario.id} ya está encriptada.`);
      }
    }

    console.log("Proceso de encriptación completado.");
  } catch (error) {
    console.error("Error al encriptar contraseñas:", error);
  } finally {
    process.exit();
  }
})();
