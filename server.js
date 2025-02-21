require('dotenv').config({path: `${process.cwd()}/.env`})

const express = require('express')
const app = express()
const router = express.Router
const controller = require('./controller/controller')

const contr = new controller()

app.set('view engine', 'ejs')

/**
const databaseConfigPath = './integration/config/database.js'
const database = require (databaseConfigPath);

try {
    database.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }

*/

app.get('/', (req,res) => {
    res.render('../api/index')
})

app.use('/api', contr.getRouter())

const PORT = process.env.SERVER_PORT || 3001

app.listen(PORT, () => {
    console.log("Server is up and running!" , PORT)
})