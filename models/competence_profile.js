const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('competence_profile', {
    competence_profile_id: {
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
    competence_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'competence',
        key: 'competence_id'
      }
    },
    years_of_experience: {
      type: DataTypes.DECIMAL,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'competence_profile',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "competence_profile_pkey",
        unique: true,
        fields: [
          { name: "competence_profile_id" },
        ]
      },
    ]
  });
};
