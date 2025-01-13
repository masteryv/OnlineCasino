const express = require('express');
const router = express.Router();
const dataBaseConn = require("../databaseUsers");

router.get('/games', function(req, res){
    res.render('games');
});

router.get('/game/:id', async function(req, res){

    res.send(RegExp.param.game)
})

module.exports = router;