const express = require('express');
require('dotenv').config({path: `${process.cwd()}/.env`});

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