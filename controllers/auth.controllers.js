const jwt = require("jsonwebtoken");
const {
  verifyUser,
  generateAccessToken,
  registerUser,
} = require("./auth.service");

require("dotenv").config();


function generateRefreshToken(data) {
  return jwt.sign(data, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });
}


async function login(req, res) {
  const { email, password } = req.body;

  const user = await verifyUser(email, password);
  if (!user)
    return res.status(403).json({ message: "Email o password incorrectos" });

  const userData = {
    idUsuario: user.idUsuario,
    email: user.email,
    rol: user.rol,
  };

  const accessToken = generateAccessToken(userData);
  const refreshToken = generateRefreshToken(userData);


  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: false, 
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000, 
  });

  res.json({
    accessToken,
    refreshToken,
    usuario: {
      idUsuario: user.idUsuario,
      nombre: user.nombre,
      email: user.email,
      rol: user.rol,
    },
  });
}

function refreshToken(req, res) {
  const token = req.cookies.refreshToken;

  if (!token)
    return res.status(401).json({ message: "Refresh token requerido" });

  jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "Refresh token inválido" });

    const { idUsuario, email, rol } = user;
    const newAccessToken = generateAccessToken({ idUsuario, email, rol });

    res.json({ accessToken: newAccessToken });
  });
}


function logout(req, res) {
  res.clearCookie("refreshToken");
  res.json({ message: "Sesión cerrada" });
}


async function register(req, res) {
  const { email, password, nombre, telefono, rol } = req.body;

  try {
    const newUser = await registerUser(email, password, nombre, telefono, rol);
    res.status(201).json({
      message: "Usuario registrado exitosamente",
      user: newUser,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

module.exports = { login, refreshToken, register, logout };
