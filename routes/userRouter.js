const express = require('express');
const router = express.Router();
const dataBaseConn = require("../databaseUsers");
const bcrypt = require("bcrypt");

router.get('/login', function(req, res){
    res.render('login');
});

router.get('/signup', function(req, res){
    res.render('register');
});

router.post('/login', async function(req,res){
    let email = req.body.email
    let user = await dataBaseConn.kallesbananpankaka(email)
    let test = await bcrypt.compare(req.body.password, user.password)
    if (test == true){
        res.render("index")
    }else{
        res.redirect("https://www.lbs.se")
    }
    console.log(user)

})


router.post('/signup', async function(req,res) {

    const validprnr = checkPersnr(req.body.personnr);
    if(validprnr == true){
        let result = await dataBaseConn.addUser(req.body.name, req.body.email, req.body.password, req.body.personnr, req.body.telefon, req.body.address);
        if(result.affectedRows == 1){
            res.render("login")
        }else{
            res.redirect("register")
        }
        }
        

})

function checkPersnr(personnr){

    let nrs = personnr.split('');
    let check = 0;
    for(let i = 0; i < 9 ; i++ ){ 
        let add = nrs[i] * (((i+1) % 2) + 1)
        check += add % 10
        if (add > 9){
            check += 1
        }

    }
    if((10 - (check % 10)) % 10 == personnr[9]){
        return true;
    }else{
        return false;
    }
}