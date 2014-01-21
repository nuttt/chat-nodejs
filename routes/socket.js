var io = require('socket.io');

exports.initialize = function(server, sql){
  io = io.listen(server);

  io.sockets.on('connection', function(socket){

    socket.on('set_user_id', function(data, callback){
      var user_id = data.user_id;
      var room_id = data.room_id;
      sql.in_room(user_id, room_id, function(in_room){
        if(in_room) {
          socket.set('user_id', user_id);
          socket.set('room_id', room_id);
          socket.join(room_id);
          response = JSON.stringify({
            type: 'systemMessage',
            message: "Welcome, " + user_id
          });
          socket.in(room_id).send(response);
          socket.in(room_id).broadcast.send(response);
        }
        callback(JSON.stringify({
          success: in_room
        }));
      });
    });

    socket.on('message', function(data){
      data = JSON.parse(data);
      var room_id = "";
      socket.get('user_id', function(err, user_id){
        data.user_id = user_id;
      });
      socket.get('room_id', function(err, r){
        room_id = r;
      });
      socket.in(room_id).broadcast.send(JSON.stringify(data));
      data.type = 'myMessage';
      socket.in(room_id).send(JSON.stringify(data));
    });

  });


};