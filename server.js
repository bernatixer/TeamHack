var express = require('express')
var app = express()

app.use(express.static('public'))

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/client/welcome.html');
})

app.get('/join', function (req, res) {
  res.sendFile(__dirname + '/client/mock.html');
})

app.get('/create', function (req, res) {
  res.sendFile(__dirname + '/client/mock.html');
})

app.get('/auth', function (req, res) {
  res.sendFile(__dirname + '/client/auth.html');
})

var server = app.listen(process.env.PORT || 80, function () {
  console.log('App working')
})
