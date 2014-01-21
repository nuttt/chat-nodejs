var io = require('socket.io');

exports.initialize = function(server, sql){
  io = io.listen(server);

  io.sockets.on('connection', function(socket){

    // socket.send(JSON.stringify({
    //   type: 'systemMessage',
    //   message: 'Hello from socket'
    // }));

    socket.on('set_user_id', function(data, callback){
      console.log("asdfsdafds");
      var user_id = data.user_id;
      sql.has_user(user_id, function(has_user){
        if(has_user) {
          socket.set('user_id', user_id);
          socket.send(JSON.stringify({
            type: 'systemMessage',
            message: 'Welcome, ' + user_id 
          }));
        }
        callback(JSON.stringify({
          success: has_user
        }));
      });
    });

    socket.on('message', function(data){
      socket.get('user_id', function(err, user_id){
        data.user_id = user_id;
      });
      console.log(typeof data);
      data = JSON.parse(data);
      socket.broadcast.send(data);
      data.type = 'myMessage';
      socket.send(JSON.stringify(data));
    });

  });


};