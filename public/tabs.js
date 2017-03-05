socket.emit('here', { id: window.location.hash.replace(/#/g, '') });
$('#create').on('click', function () {
  var sugID = $('#basic-url').val();
  getNewRef(sugID);
});

function click() {
  var sugID = $('#basic-url').val();
  getNewRef(sugID);
}

$( "#form_s" ).submit(function( event ) {
  var hash = window.location.hash.replace(/#/g, '');
  socket.emit('send_message', { message: $('.form-control').val(), id: hash });
  $('.form-control').val('');
  event.preventDefault();
});

socket.on('receive_message', function (data) {
  $('.chat-list').append('<li class="media"><img class="d-flex mr-3" src="" alt="' + data.id + '"><div class="media-body">' + data.message + '</div></li>');
})
