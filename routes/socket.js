var io = require('socket.io');

exports.initialize = function(server){
  io = io.listen(server);

  io.sockets.on('connection', function(socket){

    socket.send(JSON.stringify({
      type: 'systemMessage',
      message: 'Hello from socket'
    }));

    socket.on('message', function(data){
      data = JSON.parse(data);
      socket.broadcast.send(JSON.stringify(data));
      data.type = 'myMessage';
      socket.send(JSON.stringify(data));
    });

  });


};