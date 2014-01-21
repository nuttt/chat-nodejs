var io = require('socket.io');

exports.initialize = function(server, mysql){
  io = io.listen(server);

  io.sockets.on('connection', function(socket){

    // socket.send(JSON.stringify({
    //   type: 'systemMessage',
    //   message: 'Hello from socket'
    // }));

    socket.on('set_user_id', function(data, ack){
      ack(JSON.stringify({
        success: true
      }));
    });

    socket.on('message', function(data){
      data = JSON.parse(data);
      socket.broadcast.send(JSON.stringify(data));
      data.type = 'myMessage';
      socket.send(JSON.stringify(data));
    });

  });


};