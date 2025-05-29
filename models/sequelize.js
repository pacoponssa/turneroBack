const { Sequelize } = require('sequelize');
const config = require('../config');

// Configuración de Sequelize
const sequelize = new Sequelize(
  config.db.schema,
  config.db.user,
  config.db.password,
  {
    host: config.db.host,
    dialect: config.db.dialect,
    port: config.db.port,
  }
);

// Probar la conexión
(async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexión a la base de datos establecida correctamente.');
  } catch (error) {
    console.error('No se pudo conectar a la base de datos:', error);
  }
})();

module.exports = sequelize;
