var express = require('express')
var app = express()

var Firepad  = require('firepad')
var firebase = require('firebase')

// Initialize Firebase.
var config = {
  apiKey: "AIzaSyCEAf0HUaipyEGIVYL5v_5CatIA9mBGHzQ",
  authDomain: "team-69132.firebaseapp.com",
  databaseURL: "https://team-69132.firebaseio.com/"
}
firebase.initializeApp(config)

var rootRef = firebase.database().ref()
var firepadRef = rootRef.push()
var headless = new Firepad.Headless(firepadRef)

headless.setHtml('<b>Welcome to Firepad!</b>', function(err, committed) {
  // *err*       will be set if there was a catastrophic failure
  // *committed* will be true on success, or false if there was a history
  //               conflict writing to the pad's history.
});

headless.getText(function(text) {
  console.log("Contents of firepad retrieved: " + text);
});

app.get('/', function (req, res) {
  res.send('Hello mon!')
})

var server = app.listen(process.env.PORT || 3000, function () {
  var host = server.address().address
  var port = server.address().port
  console.log('App listening at http://%s:%s', host, port)
})
