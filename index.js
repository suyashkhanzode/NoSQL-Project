const express = require("express");
const connection = require('./utils/database')

const app = express();

connection.connect((client)=>{
    console.log(client)
    app.listen(3000,()=>{
    console.log("Server Started")
    })
})

