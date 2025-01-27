const express = require('express');
const router = express.Router();
const dataBaseConn = require("../databaseUsers");

router.get('/games', function(req, res){
    res.render('games');
});

router.get('/addGames', function(req, res){
    res.render('register-game')
});

router.post('/addGames', async function(req, res) {
    let result = await dataBaseConn.addGame(req.param)
    if(result.affectedRows == 1){
        res.redirect("/games")
    }
})

router.get('/games/:game', async function(req, res){

    res.send(req.params.game)
})

module.exports = router;