const mysql = require("mysql2/promise")
const dotenv = require("dotenv").config()
const bcrypt = require("bcrypt");


const conn = mysql.createPool({

    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT,
})



async function getUser(email) {
    const [res] = await conn.query(`
        SELECT * FROM users 
        WHERE email = ?
        `, [email]);
        return res[0];
}

const addUser = async function addUser(name, email, password, personnr, telefon, address) {
    let passwordHash = await bcrypt.hash(password, 10)
    const res  = await conn.query('INSERT INTO users (name, email, password, personnr, img, telefon, address, verified, cash) VALUES (?,?,?,?,?,?,?,?,?)' , [name, email , passwordHash, personnr, "/assets/img/default.jpg", telefon, address, true, 0])
    return res[0]
    
}

module.exports = {
   kallesbananpankaka: getUser,
   addUser: addUser,
}