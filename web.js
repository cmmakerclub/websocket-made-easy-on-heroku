var path = require('path');
var gzippo = require('gzippo');
var express = require('express')
  , io = require('socket.io')
  , http = require('http')
  , morgan = require("morgan");
var cv = require("opencv");

var app = express()
    .use(morgan('combined'))
    //.use(methodOverride('X-HTTP-Method-Override'))
    app.use(express.static(path.join(__dirname, 'dist')));
    // .use(gzippo.staticGzip(path.join(__dirname, "/dist")));

var server = http.createServer(app)
, io = io.listen(server);

var routes = require('./routes/index')(io);
app.use('/', routes)


io.on('connection', function (socket) {
  console.log("CONNECTION ", socket.id, " connected");

  socket.emit('socket', { socket_id: socket.id } );

  socket.emit('news', { hello: 'world' });


  socket.on('my other event', function (data) {
    console.log(data);
  });

	socket.on('frame', function(data) {
      var orig_base64 = data;
      // console.log(data.length);
      //chrome 2459
      // firefore 2727
      if (!data || data.length < 5000) { 
        return ; 
      }

      // 'data:image/jpeg;base64,'
      data = data.split(',')[1]
      var frame_data = new Buffer(data, 'base64'); 
      cv.readImage(frame_data, function(err, im) {
        var img_gray = im.copy();
        var img_hsv = im.copy();
        var filter_image = im.copy();

        im.detectObject(cv.FACE_CASCADE, {}, function(err, faces){
          if (!faces){
            console.log("No Faces")
            return;
          }
          var face = faces[0] || {}
            , ims = im.size()

          var im2 = im.roi(face.x, face.y, face.width, face.height)
          
          im.adjustROI(
               -face.y
             , (face.y + face.height) - ims[0]
             , -face.x
             , (face.x + face.width) - ims[1])
             
          img_gray.convertGrayscale();
          img_hsv.convertHSVscale();


          console.log("EMIT: ");
          socket.emit('face_data', {
            image_gray: img_gray.toBuffer().toString('base64'),
            image_hsv: img_hsv.toBuffer().toString('base64'),
            image_face: im.toBuffer().toString('base64'),
            image_orig: orig_base64
          })

          socket.broadcast.emit('face_data', { 
            image_gray: img_gray.toBuffer().toString('base64'), 
            image_hsv: img_hsv.toBuffer().toString('base64'),
            image_face: im.toBuffer().toString('base64'),
            image_orig: orig_base64 
          })

          im2.save('out.jpg')

        });
      });
    });

});

server.listen(process.env.PORT || 5000);
