module.exports = (sequelize, Sequelize) => {
  const { DataTypes } = Sequelize;

  const ProfesorDisciplina = sequelize.define("ProfesorDisciplina", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    profesor_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'usuarios',
        key: 'idUsuario',
      }
    },
    disciplina_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'disciplinas',
        key: 'idDisciplina',
      }
    },
  }, {
    tableName: 'profesor_disciplina',
    timestamps: false,
    indexes: [
      {
        unique: true,
        fields: ['profesor_id', 'disciplina_id']
      }
    ]
  });

  return ProfesorDisciplina;
};
