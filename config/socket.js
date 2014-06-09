// export function for listening to the socket
module.exports = function (socket) {
  var name = "";

  // send the new user their name and a list of users
  socket.emit('init', function (data){
    name: data.user
  });

  // broadcast a user's message to other users
  socket.on('send:message', function (data) {
    socket.broadcast.emit('send:message', {
      user: data.user,
      text: data.text,
      touser :data.touser
    });
  });

  // clean up when a user leaves, and broadcast it to other users
  socket.on('disconnect', function () {
    socket.broadcast.emit('user:left', {
      name: name
    });
    name ="";
  });
};
