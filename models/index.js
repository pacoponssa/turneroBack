const Sequelize = require('sequelize');
const sequelize = require('./sequelize');

// Importar modelos
const Usuario = require('./usuario.models')(sequelize, Sequelize);
const Disciplina = require('./disciplina.models')(sequelize, Sequelize);
const Horario = require('./horario.models')(sequelize, Sequelize);
const Reserva = require('./reserva.models')(sequelize, Sequelize);
const Cancelacion = require('./cancelacion.models')(sequelize, Sequelize);

// Definir relaciones
// Un horario pertenece a una disciplina
Horario.belongsTo(Disciplina, { foreignKey: 'idDisciplina' });
Disciplina.hasMany(Horario, { foreignKey: 'idDisciplina' });

// Una reserva pertenece a un usuario y a un horario
Reserva.belongsTo(Usuario, { foreignKey: 'idUsuario' });
Usuario.hasMany(Reserva, { foreignKey: 'idUsuario' });
Reserva.belongsTo(Horario, { foreignKey: 'idHorario' });
Horario.hasMany(Reserva, { foreignKey: 'idHorario' });

// Una cancelación pertenece a una reserva
Cancelacion.belongsTo(Reserva, { foreignKey: 'idReserva' });
Reserva.hasOne(Cancelacion, { foreignKey: 'idReserva' });

module.exports = {
  sequelize,
  Usuario,
  Disciplina,
  Horario,
  Reserva,
  Cancelacion,
};
