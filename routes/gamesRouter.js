const express = require('express');
const router = express.Router();
const dataBaseConn = require("../databaseUsers");

router.get('/games', function(req, res){
    res.render('games');
});

router.get('/games/:game', async function(req, res){

    res.send(req.params.game)
})

module.exports = router;