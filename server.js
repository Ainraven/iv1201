require('dotenv').config({path: `${process.cwd()}/.env`});

const express = require('express');
const databaseConfigPath = './integration/config/database.js'

const database = require (databaseConfigPath);
const app = express();

try {
    database.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }

app.get('/', (req,res) => {
    res.json({
        status:"success",
        message:"you connected woo"
    })
})


const PORT = process.env.SERVER_PORT || 3001;

app.listen(PORT, () => {
    console.log("Server is up and running!" , PORT)
})