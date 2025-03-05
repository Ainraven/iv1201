require('dotenv').config({path: `${process.cwd()}/.env`})

const express = require('express')
const app = express()
const router = express.Router
const controller = require('./controller/controller')
const path = require('path')

const contr = new controller()

app.use(express.static(path.join(__dirname + '/api/public')))

app.set('views', path.join(__dirname + '/api/views'))
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
  res.render('index')
})
app.get('/applications', (req,res) => {
  res.render('applications')
})

app.use('/api', contr.getRouter())


const PORT = process.env.SERVER_PORT || 3000

app.listen(PORT, '0.0.0.0', () => {
    console.log("Server is up and running on port" , PORT)
})