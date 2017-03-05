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
  socket.on('createID', function (id) {
    if (rooms.indexOf(id) == -1) {
      rooms.push(id);
      socket.join(id);
      socket.emit('redirect', 'http://localhost/join#' + id);
    } else {
      socket.emit('alreadyExist');
    }
  });
  socket.on('joinID', function (id) {
    if (rooms.indexOf(id) == -1) {
      socket.emit('noExist');
    } else {
      socket.join(id);
      socket.emit('redirect', 'http://localhost/join#' + id);
    }
  });

  socket.on('existsID', function (id) {
    if (rooms.indexOf(id) == -1) {
      // no existeix
      socket.emit('resExistsID', false, id);
    } else {
      // si existeix
      socket.emit('resExistsID', true, id);
    }
  });
  socket.on('existsIDs', function (data) { // id, reqID, ref,hash
    if (rooms.indexOf(data.id) == -1) {
      // no existeix
      socket.emit('resExistsIDs', false, false, data.ref, data.hash);
    } else {
      // si existeix
      if (rooms.indexOf(data.id + '_' + data.reqID) == -1) {
        if (id.indexOf('_') == -1) {
          rooms.push(data.id + '_' + data.reqID);
        } else {
          rooms.push(id.substring(0, id.indexOf('_')) + '_' + data.reqID);
        }
        socket.emit('resExistsIDs', true, false, data.ref, data.hash);
      } else {
        socket.emit('resExistsIDs', true, true, data.ref, data.hash);
      }
    }
  });
});

server.listen(process.env.PORT || 80, function () {
  console.log('App working')
})
