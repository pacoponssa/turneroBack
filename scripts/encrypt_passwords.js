const bcrypt = require("bcrypt");
const db = require("../models/index");
const Usuario = db.Usuario;

(async () => {
  try {
    // Obtiene todos los usuarios
    const usuarios = await Usuario.findAll();

    for (const usuario of usuarios) {
      // Verifica si el password ya está encriptado
      const isEncrypted = usuario.password.startsWith("$2b$");

      if (!isEncrypted) {
        // Encripta el password
        const hashedPassword = await bcrypt.hash(usuario.password, 10);

        // Actualiza el password en la base de datos
        await Usuario.update(
          { password: hashedPassword },
          { where: { idUsuario: usuario.idUsuario } }
        );

        console.log(`Password encriptado para el usuario con ID: ${usuario.idUsuario}`);
      } else {
        console.log(`El password del usuario con ID: ${usuario.idUsuario} ya está encriptado.`);
      }
    }

    console.log("Proceso de encriptación completado.");
  } catch (error) {
    console.error("Error al encriptar passwords:", error);
  } finally {
    process.exit();
  }
})();
