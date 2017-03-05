var socket = io.connect('http://localhost');
/*socket.on('resExistsIDs', function (data) { // exists, req_exists, ref, hash
  if (exists) {
    if (!req_exists) {
      var main;
      if (hash.indexOf('_') == -1) {
        main = hash;
      } else {
        main = hash.substring(0, hash.indexOf('_'));
      }
      $('#dropdownMenuButton').text(requestedID);
      window.location = ip + '/join#' + main + '_' + requestedID;
      ref = ref.child(requestedID);
      tab_kr(true, ref);
    } else {
      $('#create_tab').text("This team already exists!");
      tab_kr(false, null);
    }
  } else {
    alert('#567');
    window.location = ip;
  }
});*/

function tab_kr (created, tab) {
  if (created) {
    var tabId = tab.key;
    newTab(tab);
    $("#tabs_dropdown").append('<a class="dropdown-item" href="#" onclick="switchTab(\'' + tabId + '\')">' + tabId + '</a>');
    $('.modal').modal('toggle');
  }
}

socket.on('resExistsID', function (exists, hash) {
  if (exists) {
    var ref = firebase.database().ref();
    hash = window.location.hash.replace(/#/g, '');
    ref = ref.child(hash);
    newTab(ref);
  } else {
    // alert('no existeix!!!');
    window.location = ip;
  }
});

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
  $('#dropdownMenuButton').text(hash);
  $('#basic-addon3').text(hash + '_');
  socket.emit('existsID', hash);
}

function newTab(firepadRef) {
  //// Create ACEs
  $('.firepad').remove();
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
function getNewRef(requestedID) {
  var ref = firebase.database().ref();
  var hash = window.location.hash.replace(/#/g, '');
  if (hash) {
    socket.emit('existsIDs', { hash: hash, requestedID: requestedID, ref: ref, hash: hash });
    ////////////////////////////////// hwerererererer ///////////////////////////
    ////////////////////////////////// hwerererererer ///////////////////////////
    ////////////////////////////////// hwerererererer ///////////////////////////
    //ref = ref.push(); // generate unique location.
  } else {
    window.location = ip;
  }
  if (typeof console !== 'undefined') {
    // console.log('Firebase data: ', ref.toString());
  }
}

function switchTab(tabID) {
  var ref = firebase.database().ref();
  $('#dropdownMenuButton').text(tabID);
  var hash = window.location.hash.replace(/#/g, '');
  console.log(hash + ' = ' + tabID);
  var main;
  if (hash.indexOf('_') == -1) {
    main = hash + '_';
  } else {
    main = hash.substring(0, hash.indexOf('_')) + '_';
  }
  console.log(tabID + ' - ' + main);
  window.location = ip + '/join#' + main + tabID;
  ref = ref.child(main + tabID);
  newTab(ref);
}

function send(name){
    var message = $('.form-control').val();
    if (message != ''){
        $('.chat-list').append('<li class="media"><img class="d-flex mr-3" src="" alt="' + name + '"><div class="media-body">' + message + '</div></li>');
    }
    $('.form-control').val('');
}
