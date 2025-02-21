const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('competence', {
    competence_id: {
      autoIncrement: true,
      autoIncrementIdentity: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'competence',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "competence_pkey",
        unique: true,
        fields: [
          { name: "competence_id" },
        ]
      },
    ]
  });
};
