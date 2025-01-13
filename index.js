const express = require('express');
const app = express();
const port = 3000;
const dataBaseConn = require("./databaseUsers")
const mysql = require("mysql2/promise")

const bcrypt = require("bcrypt");
const dotenv = require("dotenv").config()


const conn = mysql.createPool({

    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT,
})



app.set("view engine", "ejs")
app.use("/public", express.static("public"));

app.use(express.urlencoded({extended:false}))


app.get('/', async function(req, res){

    const test = await conn.query(`SELECT * FROM users`);
    console.log(test);

    
    res.render('index');
});



app.listen(port, function(){
    console.log(`servern kör på http://localhost:${port}`);
});