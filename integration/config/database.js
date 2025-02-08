//file used as a parameter to get configurations for database. 
require('dotenv').config({path: `${process.cwd()}/.env`});
const {Sequelize} = require ('sequelize');
const env = process.env.NODE_ENV || 'development'
const config = require ('./config');

const sequelize =  new Sequelize(config[env]);

module.exports = sequelize;