function init() {
  //// Initialize Firebase.
  var config = {
    apiKey: "AIzaSyB8IH4q1aZtwjZS6liKEul_B0Ie3HouYmc",
    authDomain: "teamhack-bd156.firebaseapp.com",
    databaseURL: "https://teamhack-bd156.firebaseio.com"
  };
  firebase.initializeApp(config);
  //// Get Firebase Database reference.
  var firepadRef = getExampleRef();
  //// Create ACE
  var editor = ace.edit("firepad-container");
  editor.setTheme("ace/theme/textmate");
  var session = editor.getSession();
  session.setUseWrapMode(true);
  session.setUseWorker(false);
  session.setMode("ace/mode/javascript");
  //// Create Firepad.
  var firepad = Firepad.fromACE(firepadRef, editor, {
    defaultText: '// Showing porno to meeee!!'
  });
}
// Helper to get hash from end of URL or generate a random one.
function getExampleRef() {
  var ref = firebase.database().ref();
  var hash = window.location.hash.replace(/#/g, '');
  if (hash) {
    ref = ref.child(hash);
  } else {
    ref = ref.push(); // generate unique location.
    window.location = window.location + '#' + ref.key; // add it as a hash to the URL.
  }
  if (typeof console !== 'undefined') {
    console.log('Firebase data: ', ref.toString());
  }
  return ref;
}

$(document).ready(function (){
    for (var i = 0; i < 50; i++){
        $('.chat-list').append('<li class="media"><img class="d-flex mr-3" src="..." alt="Gege"><div class="media-body">Cras sit amette sollici faucibus.</div></li>');
    }


});
