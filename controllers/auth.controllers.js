const jwt = require("jsonwebtoken");

const {
  verifyUser,
  generateAccessToken,
  registerUser,
} = require("./auth.service");
const refreshTokens = [];

// Controlador para login
async function login(req, res) {
  const { email, password } = req.body;

  // Verifica si el usuario es válido
  console.log("llega a login", email, password);
  const user = await verifyUser(email, password);
  console.log("user::", user);
  if (!user)
    return res
      .status(403)
      .json({ message: "Email o password incorrectos" });

  // Genera los tokens de acceso y refresh
  const accessToken = generateAccessToken({ email: user.email });
 

  res.json({ accessToken });
}

// Controlador para refrescar el token
function refreshToken(req, res) {
  const { token } = req.body;

  if (!token)
    return res.status(401).json({ message: "Token requerido" });
 
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "Token inválido" });

    const accessToken = generateAccessToken({ email: user.email });

    console.log("llega a refresh", accessToken);
    res.json({ accessToken });
  });
}

async function register(req, res) {
  const { email, password, nombre, telefono, rol } = req.body;

  try {
    const newUser = await registerUser(email, password, nombre, telefono, rol);
    res
      .status(201)
      .json({ message: "Usuario registrado exitosamente", user: newUser });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

module.exports = { login, refreshToken, register };
