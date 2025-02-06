const express = require('express');
require('dotenv').config({path: `${process.cwd()}/.env`});

//initializes the models, might not be needed here but this is the code snippet
var initModels = require("./models/init-models");
models = initModels;

const app = express();

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