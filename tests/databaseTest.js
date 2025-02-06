const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');

const jane = sequelize.model.person.create({name: 'Jane'})

console.log(jane.toJSON());
