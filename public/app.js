var socket = io.connect('http://localhost');

function init() {
  //// Initialize Firebase.
  var config = {
    apiKey: "AIzaSyB8IH4q1aZtwjZS6liKEul_B0Ie3HouYmc",
    authDomain: "teamhack-bd156.firebaseapp.com",
    databaseURL: "https://teamhack-bd156.firebaseio.com"
  };
  firebase.initializeApp(config);
}

function newTab(firepadRef) {
  //// Get Firebase Database reference.
  $('.tabs-container').append('<li class="nav-item"><a class="nav-link active" href="#' + firepadRef.key + '">' + 'filename' + '</a></li>')
  $('main').append('<div id="' + firepadRef.key + '"></div>');
  //// Create ACE
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
  console.log('a')
  var ref = firebase.database().ref();
  var hash = window.location.hash.replace(/#/g, '');
  if (hash) {
    //ref = ref.child(hash);
    callback(false, ref);
    //ref = ref.push(); // generate unique location.
    // window.location = window.location + '#' + ref.key; // add it as a hash to the URL.
  } else {
    console.log('b')
    socket.emit('getID', hash);
    socket.on('receiveID', function (exists, newID) {
      console.log('c')
      if (exists) {
        alert('Name already exsists');
        callback(false, ref);
      } else {
        console.log('ID: ' + newID);
        ref.key = newID;
        callback(true, ref);
      }
    });
  }
  if (typeof console !== 'undefined') {
    console.log('Firebase data: ', ref.toString());
  }
}

function send(name){
    var message = $('.form-control').val();
    if (message != ''){
        $('.chat-list').append('<li class="media"><img class="d-flex mr-3" src="" alt="' + name + '"><div class="media-body">' + message + '</div></li>');
    }
    $('.form-control').val('');
}
