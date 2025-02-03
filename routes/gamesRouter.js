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
    let result = await dataBaseConn.addGame(req.body.name, req.body.chance, req.body.text)
    if(result.affectedRows == 1){
        res.redirect("/games")
    }
})

router.get('/games', async function(req, res){
    let games = await dataBaseConn.getGames();
    res.render('games', {games});
});

router.get('/games/:game', async function(req, res){
    let game = await dataBaseConn.getGame(req.params.game)
    if(game != undefined){
        res.render("game", {game})
    }else{
        res.status(404).render('404');
    }
})

router.post('/games/script.js', async function(req, res){
    let game = await gameFunc.Coinflip(req.body.choise)
    let multi = game.status ? 0 : -1;
    let bet = req.body.bet * multi;
    let update = await dataBasConn.updateFunds(Number(req.body.bet) * multi, req.session.user.id)
    game.funds = update.cash
    res.status(200).json({ game });
})

module.exports = router;