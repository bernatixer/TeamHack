var express = require('express')
var app = express()

app.use(express.static('public'))

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/public/mock.html');
})

app.get('/auth', function (req, res) {
  res.sendFile(__dirname + '/public/auth.html');
})

var server = app.listen(process.env.PORT || 80, function () {
  console.log('App working')
})
