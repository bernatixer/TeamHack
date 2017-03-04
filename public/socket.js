var socket = io.connect('http://localhost');

function getTeamID (id, callback) {
  socket.emit('getID', id);
  socket.on('receiveID', function (exists, newID) {
    if (exists) {
      alert('Already exists');
    } else {
      callback(newID);
    }
  });
}
