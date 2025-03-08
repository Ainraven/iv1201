// Environmental configuration
require('dotenv').config({path: `${process.cwd()}/.env`})

// Impoorts
const path = require('path')
const express = require('express')
const Controller = require('./controller/controller')

// Objects
const app = express()
const router = express.Router()
const contr = new Controller()

// Public files such as CSS and JS for frontend pages
app.use(express.static(path.join(__dirname + '/api/public')))

// Adds views and sets view engine to EJS
app.set('views', path.join(__dirname + '/api/views'))
app.set('view engine', 'ejs')

// Require possibility to read json
app.use(express.json())

// Index page
app.get('/', (req,res) => {
  res.render('index')
})
app.get('/myprofile', (req,res) => {
  res.render('profileView')
})

// Routes
app.use('/api', contr.getRouter())
app.use('/auth', require('./routes/authRoutes'))
app.use('/applications', require('./routes/applicationsRoutes'))

app.use("/403", (req, res) => {
  res.status(403).render("403")
})
// Page not found, must be last amongst routes
app.use((req, res) => {
  res.status(404).render("404")
})

// Server
const PORT = process.env.SERVER_PORT || 3000
app.listen(PORT, '0.0.0.0', () => {
    console.log("Server is up and running on port" , PORT)
})