const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const db = require("../models/index");
const Usuario = db.Usuario;

// Verifica el usuario y la contraseña desde la base de datos
async function verifyUser(email, password) {
  console.log("llega a verifyUser", email, password);
  const user = await Usuario.findOne({ where: { email } });
  console.log("Usuario encontrado en la base de datos:", user);

  if (!user || !user.password) {
    console.error("Usuario no encontrado o password no definido");
    return null;
  }

  console.log("Password proporcionado:", password);
  console.log("Password almacenado:", user.password);

  const validPassword = await bcrypt.compare(password, user.password);
  console.log("Resultado de la comparación de passwords:", validPassword);

  return validPassword ? user : null;
}

// Verifica que la clave secreta esté definida
if (!process.env.ACCESS_TOKEN_SECRET) {
  throw new Error("La clave secreta para el token de acceso (ACCESS_TOKEN_SECRET) no está definida en las variables de entorno.");
}

// Genera un token de acceso
function generateAccessToken(data) {
  return jwt.sign(data, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "15m" });
}

// Registra un nuevo usuario con password encriptado
async function registerUser(email, password, nombre, telefono, rol = 1) {
  // Verifica si el usuario ya existe
  const existingUser = await Usuario.findOne({ where: { email } });
  if (existingUser) {
    throw new Error("El usuario ya existe");
  }

  // Encripta el password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Crea y guarda el nuevo usuario con los campos adicionales
  const newUser = await Usuario.create({
    email,
    password: hashedPassword,
    nombre,
    telefono,
    rol
  });

  console.log("newUser:", newUser);

  return { email: newUser.email, nombre: newUser.nombre, telefono: newUser.telefono, rol: newUser.rol };
}

module.exports = {
  verifyUser,
  generateAccessToken,
  registerUser,
};
