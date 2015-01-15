var express = require('express');
var router = express.Router();
var _ = require("underscore");

/* GET home page. */
// router.get('/nat', function(req, res) {

module.exports =  function(io) {
    router.get('/nat/:p1/:p2/:clientId', function(req, res, next) {
        console.log(Object.keys(io.sockets.connected));

       // _(io.sockets.connected).forEach(function(client) {

        // io.socket.to(Object.keys(io.sockets.connected)[0]).emit("news", "WOW");
        //     console.log(client.id);
        // })

        io.sockets.emit('news', 'everyone');
      res.send('Hello World!')
    });
    return router;
}


