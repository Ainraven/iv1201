const Sequelize = require('sequelize')
const bcrypt = require('bcrypt')
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('person', {
    person_id: {
      autoIncrement: true,
      autoIncrementIdentity: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    surname: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    pnr: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    role_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'role',
        key: 'role_id'
      }
    },
    username: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'person',
    schema: 'public',
    timestamps: false,
    hooks: {
      // Hash password before saving
      beforeCreate: async (user) => {
        const salt = await bcrypt.genSalt(10)
        user.password = await bcrypt.hash(user.password, salt)
      },
      beforeUpdate: async (user) => {
        if (user.changed('password')) {
          const salt = await bcrypt.genSalt(10)
          user.password = await bcrypt.hash(user.password, salt)
        }
      }
    },
    indexes: [
      {
        name: "person_pkey",
        unique: true,
        fields: [
          { name: "person_id" },
        ]
      },
    ]
  });
};
