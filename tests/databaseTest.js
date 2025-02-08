
const UserDAO = require('../integration/UserDAO.js'); 
require('dotenv').config({path: `${process.cwd()}/.env`});

const databaseConfigPath = '../integration/config/database.js'
const database = require (databaseConfigPath);

const userDAO = new UserDAO();

userDAO.connectToDB()
setTimeout(() => { 
}, 1000);

userDAO.findPerson("JoelleWilkinson");  
userDAO.findAllPersons();

