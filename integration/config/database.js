//file used as a parameter to get configurations for database. 
require('dotenv').config({path: `${process.cwd()}/.env`})
const {Sequelize} = require ('sequelize')
const env = process.env.NODE_ENV || 'development'
const config = require ('./config')
console.log("Environment mode:", process.env.NODE_ENV)
console.log("Database:", process.env.DB_NAME)

const sequelize =  new Sequelize(config[env])

module.exports = sequelize