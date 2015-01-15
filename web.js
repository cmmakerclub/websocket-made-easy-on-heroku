var path = require('path');
var gzippo = require('gzippo');
var express = require('express')
  , io = require('socket.io')
  , http = require('http')
  , morgan = require("morgan");

var app = express()
    .use(morgan('combined'))
    .use(methodOverride('X-HTTP-Method-Override'))
    app.use(express.static(path.join(__dirname, 'dist')));
    // .use(gzippo.staticGzip(path.join(__dirname, "/dist")));

var server = http.createServer(app)
, io = io.listen(server);

var routes = require('./routes/index')(io);
app.use('/', routes)


io.on('connection', function (socket) {
  console.log("CONNECTION ", socket.id, " connected");
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});

server.listen(process.env.PORT || 5000);
