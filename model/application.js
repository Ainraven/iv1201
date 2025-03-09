const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('application', {
    application_id: {
      autoIncrement: true,
      autoIncrementIdentity: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    person_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'person',
        key: 'person_id'
      }
    },
    application_status_id:{
        type: Sequelize.BOOLEAN,
        allowNull: true
    }
  }, {
    sequelize,
    tableName: 'application',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "application_pkey",
        unique: true,
        fields: [
          { name: "application_id" },
        ]
      },
    ]
  });
};
