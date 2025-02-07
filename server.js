const express = require('express');
require('dotenv').config({path: `${process.cwd()}/.env`});

const app = express();

const config = './integration/config/database.js'
const database = require (config);


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


const PORT = process.env.SERVER_PORT || 3000;

app.listen(PORT, () => {
    console.log("Server is up and running!" , PORT)
})