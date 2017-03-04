var express = require('express')
var app = express()

var server = require('http').Server(app);
var io = require('socket.io')(server);

app.use(express.static('public'))

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/client/welcome.html');
})

app.get('/join', function (req, res) {
  res.sendFile(__dirname + '/client/app.html');
})

app.get('/create', function (req, res) {
  res.sendFile(__dirname + '/client/app.html');
})

app.get('/auth', function (req, res) {
  res.sendFile(__dirname + '/client/auth.html');
})

var rooms = [];
io.on('connection', function (socket) {
  socket.on('getID', function (id) {
    if (rooms.indexOf(id) == -1) {
      rooms.push(id);
      socket.join(id);
      socket.emit('receiveID', false, id);
    } else {
      socket.emit('receiveID', true, id);
    }
  });
});

server.listen(process.env.PORT || 80, function () {
  console.log('App working')
})
