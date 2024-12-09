const express = require('express');
const app = express();
const port = 3000;
const mysql = require("mysql2/promise")
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

app.get('/login', function(req, res){
    res.render('login');
});

app.get('/signup', function(req, res){
    res.render('register');
});

app.post('/signup', async function(req,res) {

    const result = await conn.query('INSERT INTO users (name, email, password, personnr, img, telefon, address, verified, cash) VALUES (?,?,?,?,?,?,?,?,?)' , [req.body.name, req.body.email , req.body.password, req.body.personnr, "/assets/img/default.jpg", req.body.telefon, req.body.address, true, 0])
    console.log(result);
    res.send(req.body)
})

app.listen(port, function(){
    console.log(`servern kör på http://localhost:${port}`);
});