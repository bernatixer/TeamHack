
function init() {
  //// Initialize Firebase.
  var config = {
    apiKey: "AIzaSyB8IH4q1aZtwjZS6liKEul_B0Ie3HouYmc",
    authDomain: "teamhack-bd156.firebaseapp.com",
    databaseURL: "https://teamhack-bd156.firebaseio.com"
  };
  firebase.initializeApp(config);
  //// Get Firebase Database reference.
  var firepadRef = getNewRef();
  $('.tabs-container').append('<li class="nav-item"><a class="nav-link active" href="#' + firepadRef.key + '">' + 'filename' + '</a></li>')
  $('main').append('<div id="' + firepadRef.key + '"></div>');
  //// Create ACE
  var editor = ace.edit(firepadRef.key);
  console.log(14231);
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

function spawn() {
    $('.tabs-container').append('<li class="nav-item"><a class="nav-link active" href="#">' + 'filename' + '</a></li>')
    //// Get Firebase Database reference.
    var firepadRef = getNewRef();
    //// Create ACE
    $('main').append('<div id="' + firepadRef.key + '"></div>');
    var editor = ace.edit(firepadRef.key);
    editor.setTheme("ace/theme/textmate");
    var session = editor.getSession();
    session.setUseWrapMode(true);
    session.setUseWorker(false);
    session.setMode("ace/mode/javascript");
    //// Create Firepad.
    var firepad = Firepad.fromACE(firepadRef, editor, {
      defaultText: '// Sho to meeee!!'
    });
    $('.powered-by-firepad').remove();
}

// Helper to get hash from end of URL or generate a random one.
function getNewRef() {
  var ref = firebase.database().ref();
  var hash = window.location.hash.replace(/#/g, '');
  if (hash) {
    getTeamID(hash, function (newID) {
      //window.location = window.location + '#' + newID;
      console.log('ID: ' + newID);
      ref.key = newID;
    });
  } else {
    ref = ref.child(hash);
    //ref = ref.push(); // generate unique location.
    // window.location = window.location + '#' + ref.key; // add it as a hash to the URL.
  }
  if (typeof console !== 'undefined') {
    console.log('Firebase data: ', ref.toString());
  }
  return ref;
}

function send(name){
    var message = $('.form-control').val();
    if (message != ''){
        $('.chat-list').append('<li class="media"><img class="d-flex mr-3" src="" alt="' + name + '"><div class="media-body">' + message + '</div></li>');
    }
    $('.form-control').val('');
}
