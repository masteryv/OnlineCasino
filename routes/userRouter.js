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

router.get('/settings', async function(req, res){
    let user = await dataBaseConn.kallesbananpankaka(req.session.user.id);
    res.render('settings', {user});

});

router.post('/settings', async function(req, res){
    let user = await dataBaseConn.kallesbananpankaka(req.session.user.id);
    let addedMoney = Number(req.body.funds);
    if(!isNaN(addedMoney)&& addedMoney > 0){
        let newMoney = Number(req.body.funds) + user.cash;
        let update = await dataBaseConn.updateFunds(newMoney, req.session.user.id); 
        user.cash = newMoney;
        user.msg ="Now You can gamble even more!";
        console.log(update);
    }else{
        user.msg ="Please add money not letters! Also you can't take money!!";
    }
    res.render('settings', {user});
})

router.post('/login', async function (req,res) {
    let user = await dataBaseConn.kallesbananpankaka(req.body.email);
    if (await bcrypt.compare(req.body.password, user.password)){
        req.session.user = {id:user.email};
        res.redirect("/games");
    }else{
        res.render("login", {msg: "please try again"});
    }
});


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
    
module.exports = router;