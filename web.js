var gzippo = require('gzippo');
var express = require('express')
  , http = require('http')
  , morgan = require("morgan");

var app = express()
    .use(morgan('combined'))
    .use(gzippo.staticGzip("" + __dirname + "/dist"));

var server = http.createServer(app)
  , io = require('socket.io').listen(server);

server.listen(process.env.PORT || 5000);