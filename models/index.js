const Sequelize = require('sequelize');
const sequelize = require('./sequelize');

// Importar modelos
const Usuario = require('./usuario.models')(sequelize, Sequelize);
const Disciplina = require('./disciplina.models')(sequelize, Sequelize);
const Horario = require('./horario.models')(sequelize, Sequelize);
const Reserva = require('./reserva.models')(sequelize, Sequelize);
const Cancelacion = require('./cancelacion.models')(sequelize, Sequelize);

// Relaciones
Disciplina.hasMany(Horario, { foreignKey: "idDisciplina" });
Horario.belongsTo(Disciplina, { foreignKey: "idDisciplina" });

Usuario.hasMany(Reserva, { foreignKey: 'idUsuario' });
Reserva.belongsTo(Usuario, { foreignKey: 'idUsuario' });

Horario.hasMany(Reserva, { foreignKey: 'idHorario' });
Reserva.belongsTo(Horario, { foreignKey: 'idHorario' });

Reserva.hasOne(Cancelacion, { foreignKey: 'idReserva' });
Cancelacion.belongsTo(Reserva, { foreignKey: 'idReserva' });

module.exports = {
  sequelize,
  Sequelize,
  Usuario,
  Disciplina,
  Horario,
  Reserva,
  Cancelacion,
};
