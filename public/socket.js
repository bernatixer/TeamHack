var socket = io.connect('http://localhost');

function getTeamID (id, callback) {
  socket.emit('getID', id);
  socket.on('receiveID', function (exists, newID) {
    if (exists)
    callback(newID);
  });
}
