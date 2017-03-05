var express = require('express')
var app = express()

var bodyParser = require('body-parser');

var server = require('http').Server(app);
var io = require('socket.io')(server);

app.use(express.static('public'))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/client/welcome.html');
})

app.get('/join', function (req, res) {
  res.sendFile(__dirname + '/client/app.html');
})

app.get('/auth', function (req, res) {
  res.sendFile(__dirname + '/client/auth.html');
})

app.get('/get', function (req, res) {
  console.log(rooms);
})

var rooms = [];
io.on('connection', function (socket) {
  socket.on('here', function (data) {
    socket.join(data.id);
  });
  socket.on('send_message', function (data) {
    io.to(data.id).emit('receive_message', { message: data.message, id: socket.id });
  });
  socket.on('createID', function (id) {
    if (rooms.indexOf(id.url) == -1) {
      rooms.push(id.url);
      socket.join(id.url);
      socket.emit('redirect', { url: 'http://localhost/join#' + id.url });
    } else {
      socket.emit('alreadyExist');
    }
  });
  socket.on('joinID', function (id) {
    if (rooms.indexOf(id.id) == -1) {
      socket.emit('noExist');
    } else {
      socket.join(id.id);
      socket.emit('redirect', { url: 'http://localhost/join#' + id.id });
    }
  });

  socket.on('existsID', function (id) {
    if (rooms.indexOf(id.hash) == -1) {
      // no existeix
      socket.emit('resExistsID', { exists: false, id: id.hash });
    } else {
      // si existeix
      socket.emit('resExistsID', { exists: true, id: id.hash });
    }
  });
  socket.on('existsIDs', function (data) { // requestedID, hash
    if (data.hash.indexOf('_') != -1) {
      data.hash = data.hash.substring(0, data.hash.indexOf('_'));
    }
    if (rooms.indexOf(data.hash) == -1) {
      // no existeix
      socket.emit('resExistsIDs', { exists: false, req_exists: false, hash: data.hash, requestedID: data.requestedID });
    } else {
      // si existeix
      if (rooms.indexOf(data.hash + '_' + data.requestedID) == -1) {
        if (data.hash.indexOf('_') == -1) {
          rooms.push(data.hash + '_' + data.requestedID);
        } else {
          rooms.push(data.hash.substring(0, data.hash.indexOf('_')) + '_' + data.requestedID);
        }
        socket.emit('resExistsIDs', { exists: true, req_exists: false, hash: data.hash, requestedID: data.requestedID });
      } else {
        socket.emit('resExistsIDs', { exists: true, req_exists: true, hash: data.hash, requestedID: data.requestedID });
      }
    }
  });
});

server.listen(process.env.PORT || 80, function () {
  console.log('App working')
})
