var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : '127.0.0.1',
  user     : 'node',
  password : 'node',
  database : 'node_chat'
});

exports.get_connection = function(){
  return connection;
};

exports.test = function(callback){
  var res;
  connection.query('SELECT * FROM user', function(err,row){
    callback(row);
  });
};

exports.has_user = function(user_id, callback){
  connection.query('SELECT * FROM user WHERE user_id = "'+user_id+'"', function(err,row){
    callback(!err);
  });
};

exports.get_user_in_group = function(room_id, callback){
  connection.query('SELECT user.user_id FROM userroom INNER JOIN user on userroom.user_id = user.user_id WHERE room_id = '+room_id, function(err,row){
    callback(row);
  }); 
};

exports.get_joined_groups = function(user_id, callback){
  connection.query('SELECT room.room_id, room_name FROM userroom INNER JOIN room on room.room_id = userroom.room_id WHERE userroom.user_id = "'+user_id+'"', function(err,row){
    callback(row);
  }); 
};

exports.get_available_groups = function(user_id, callback){
  connection.query('SELECT * FROM room where room_id not in (select room_id from userroom where user_id = "'+user_id+'") ORDER BY room_id ASC', function(err,row){
    callback(row);
  }); 
};

exports.join_group = function(user_id, room_id, callback){
  // connection.query('INSERT INTO userroom VALUES ('+room_id+', "'+user_id+'", (SELECT max(id) FROM msg where room_id = '+room_id+'))', function(err,row){
  connection.query('INSERT INTO userroom VALUES ('+room_id+', "'+user_id+'", null)', function(err,row){
    callback(!err);
  }); 
};

exports.leave_group = function(user_id, room_id, callback){
  connection.query('DELETE FROM userroom WHERE user_id = "'+user_id+'" and room_id = '+room_id, function(err,row){
    callback(!err);
  }); 
};

exports.get_unread = function(user_id, room_id, callback){
  connection.query('SELECT * FROM msg where id > (SELECT last_read FROM userroom WHERE user_id = "'+user_id+'" and room_id = '+room_id+') and room_id = '+room_id, function(err,row){
    callback(row);
  }); 
};

exports.set_last_read = function(user_id, room_id, msg_id, callback){
  connection.query('UPDATE userroom SET last_read = '+msg_id+' WHERE user_id = "'+user_id+'" and room_id = '+room_id, function(err,row){
    callback(!err);
  }); 
};