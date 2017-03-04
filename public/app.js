var socket = io.connect('http://localhost');
// problema 131
var ip = 'http://localhost';

function init() {
  //// Initialize Firebase.
  var config = {
    apiKey: "AIzaSyB8IH4q1aZtwjZS6liKEul_B0Ie3HouYmc",
    authDomain: "teamhack-bd156.firebaseapp.com",
    databaseURL: "https://teamhack-bd156.firebaseio.com"
  };
  firebase.initializeApp(config);

  var hash = window.location.hash.replace(/#/g, '');
  socket.emit('existsID', hash);
  socket.on('resExistsID', function (exists) {
    if (exists) {
      ref = firebase.database().ref();
      hash = window.location.hash.replace(/#/g, '');
      ref = ref.child(hash);
      newTab(ref);
    } else {
      alert('no existeix!!!');
      // window.location = ip;
    }
  });
}

function newTab(firepadRef) {
  //// Create ACEs
  $('#'+firepadRef.key).remove();
  $('main').append('<div id="'+ firepadRef.key +'"></div>');
  var editor = ace.edit(firepadRef.key);
  editor.setTheme("ace/theme/textmate");
  var session = editor.getSession();
  session.setUseWrapMode(true);
  session.setUseWorker(false);
  session.setMode("ace/mode/javascript");
  //// Create Firepad.
  var firepad = Firepad.fromACE(firepadRef, editor, {
    defaultText: '// Showi meeee!!'
  });
  $('.powered-by-firepad').remove();
}

// Helper to get hash from end of URL or generate a random one.
function getNewRef(requestedID, callback) {
  var ref = firebase.database().ref();
  var hash = window.location.hash.replace(/#/g, '');
  if (hash) {
    socket.emit('existsID', hash);
    socket.on('resExistsID', function (exists) {
      if (exists) {
        // obrir
        callback(false, ref);
      } else {
        alert('ARA SORTIRE');
        window.location = ip;
      }
    });

    //ref = ref.push(); // generate unique location.
  } else {
    socket.emit('getID', requestedID);
    socket.on('receiveID', function (exists, newID) {
      if (exists) {
        alert('Name already exsists');
        callback(false, ref);
      } else {
        window.location = window.location + '#' + requestedID;
        ref = firebase.database().ref();
        hash = window.location.hash.replace(/#/g, '');
        ref = ref.child(hash);
        callback(true, ref);
      }
    });
  }
  if (typeof console !== 'undefined') {
    // console.log('Firebase data: ', ref.toString());
  }
}

function send(name){
    var message = $('.form-control').val();
    if (message != ''){
        $('.chat-list').append('<li class="media"><img class="d-flex mr-3" src="" alt="' + name + '"><div class="media-body">' + message + '</div></li>');
    }
    $('.form-control').val('');
}
