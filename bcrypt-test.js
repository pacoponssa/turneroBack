const bcrypt = require("bcrypt");

const plainPassword = "clave123";
const hashedPassword = "$2b$10$Orao4L8dn9Nikr9riRku4eTSRwjkDRcuzSQf7HRuFa9u0aoDbAt1O"; // Copiado de tu consola

bcrypt.compare(plainPassword, hashedPassword)
  .then(result => console.log("¿Coincide?", result))
  .catch(err => console.error("Error al comparar:", err));
