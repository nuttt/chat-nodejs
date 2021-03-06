var io = require('socket.io');

exports.initialize = function(server, sql){
  io = io.listen(server);

  var update_last_read = function(response){
    sql.set_last_read(response.user_id, response.room_id, response.last_read, function(e){});
  };

  io.sockets.on('connection', function(socket){

    function get_room_list(user_id, callback){
      sql.get_joined_rooms(user_id, function(joined_rooms){
        sql.get_available_rooms(user_id, function(available_rooms){
          callback({
            joined: joined_rooms,
            available: available_rooms
          });
        });
      });
    }

    socket.on('set_user_id', function(data, callback){
      var user_id = data.user_id;
      sql.has_user(user_id, function(has_user){
        if(has_user) {
          socket.set('user_id', user_id);
          get_room_list(user_id, function(group_list){
            socket.send(JSON.stringify(group_list));
          });
        }
        callback(JSON.stringify({
          success: has_user
        }));
      });
    });

    socket.on('set_user_room_id', function(data, callback){
      var user_id = data.user_id;
      var room_id = data.room_id;
      sql.in_room(user_id, room_id, function(in_room){
        if(in_room) {
          socket.set('user_id', user_id);
          socket.set('room_id', room_id);
          socket.join(room_id);
          sql.get_room_name(room_id, function(room_name){
            socket.in(room_id).emit('room_name', { room_name: room_name }, function(){});
          });
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
      var user_id = "";
      socket.get('user_id', function(err, u){
        user_id = data.user_id = u;
      });
      socket.get('room_id', function(err, r){
        room_id = r;
      });

      // socket.in(room_id).broadcast.send(JSON.stringify(data));
      // data.type = 'myMessage';
      // socket.in(room_id).send(JSON.stringify(data));

      // add to database

      sql.add_message(user_id, room_id, data.message, function(message){
        // m = JSON.stringify({
        //   type: 'systemMessage',
        //   message: "added " + JSON.stringify(message)
        // });
        // socket.in(room_id).send(m);

        // message is row of database
        message = JSON.stringify(message[0]);
        var userMessage = JSON.parse(message);
        var myMessage = JSON.parse(message);
        userMessage.type = 'userMessage';
        myMessage.type = 'myMessage';

        socket.in(room_id).broadcast.emit('new_message', userMessage, update_last_read);
        socket.in(room_id).emit('new_message', myMessage, update_last_read);

      });

    });

    socket.on('join_room', function(data, callback){
      var user_id = null;
      var room_id = data.room_id;
      socket.get('user_id', function(err, id){
        user_id = id;
        sql.join_room(user_id, room_id, function(success){
          callback(JSON.stringify({
            success: success
          }));
        });
      });
    });

    socket.on('leave_room', function(data, callback){
      var user_id = null;
      var room_id = data.room_id;
      socket.get('user_id', function(err, id){
        user_id = id;
        sql.leave_room(user_id, room_id, function(success){
          callback(JSON.stringify({
            success: success
          }));
        });
      });
    });

    socket.on('change_room_name', function(data, callback){

      var room_id = data.room_id;
      var room_name = data.room_name;

      sql.set_room_name(room_id, room_name, function(e){
        socket.in(room_id).broadcast.emit('room_name',{room_name: room_name});
        socket.in(room_id).emit('room_name',{room_name: room_name});
        message = JSON.stringify({
          type: 'systemMessage',
          message: 'Room name is changed to ' + room_name
        });
        socket.in(room_id).broadcast.send(message);
        socket.in(room_id).send(message);
      });

    });

    socket.on('get_unread', function(data){
      socket.get('user_id', function(err, u_id){
        socket.get('room_id', function(err, r_id){
          sql.get_unread(u_id, r_id, function(data){
            socket.emit('reply_unread', data, function(ack){
              if(ack.status){
                update_last_read(ack);
              }
            });
          });
        });
      });
    });

    socket.on('request_old_msg', function(data, callback){
      socket.get('user_id', function(err, u_id){
        socket.get('room_id', function(err, r_id){
          sql.get_old_msg(r_id, data.max, function(data){
            for(i in data){
              if(data[i].user_id === u_id){
                data[i].type = "myMessage";
              } else {
                data[i].type = "userMessage";
              }
            }
            callback(data);
          });
        });
      });
    });

    socket.on('new_room', function(data, callback){
      sql.add_room(data.room_name, function(){
        callback();
      });
    });
    
  });
};