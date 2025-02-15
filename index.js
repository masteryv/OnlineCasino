const express = require('express');
const app = express();
const port = 3000;

const sessions = require('express-session');

const dataBaseConn = require("./databaseUsers")
const mysql = require("mysql2/promise")

const userRouter = require("./routes/userRouter")
const gamesRouter = require("./routes/gamesRouter")
app.use(express.json());
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

app.use(sessions({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: true,
    cookie: { maxAge: 1000*60*60*24 },
    resave: false,
}));

app.use((req, res, next) => {
    res.locals.isLoggedIn = !!req.session.user ? true : false;
    if (req.session.user) {
        next();
    }else if(req.originalUrl == "/" || req.originalUrl == "/signup" || req.originalUrl == "/login") {
        next();
    }else{
        res.render('login');
    }
})


app.get('/', async function(req, res){
    const test = await conn.query(`SELECT * FROM users`);
    console.log(test);

    res.render('index');
});

app.use("/", userRouter)
app.use("/", gamesRouter)

app.use(function(req, res, next){
    res.status(404).render("404");
});

app.listen(port, function(){
    console.log(`servern kör på http://localhost:${port}`);
});