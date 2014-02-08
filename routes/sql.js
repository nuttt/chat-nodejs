// var mysql      = require('mysql');
// var connection = mysql.createConnection({
//   host     : '127.0.0.1',
//   user     : 'node',
//   password : 'node',
//   database : 'node_chat'
// });

var connection;

exports.get_connection = function(){
  return connection;
};

exports.set_connection = function(c){
  connection = c;
}

exports.test = function(callback){
  var res;
  connection.query('SELECT * FROM user', function(err,row){
    callback(row);
  });
};

exports.get_message = function(id, callback){
  connection.query('SELECT * FROM msg WHERE id = '+id, function(err,row){
    callback(row);
  });
};

exports.add_message = function(user_id, room_id, message, callback){
  connection.query('INSERT INTO msg (user_id,room_id,message) VALUES ("'+user_id+'", "'+room_id+'", "'+message+'")', function(err,result){
    exports.get_message(result.insertId, function(response){
      callback(response);
    });
  });
};

exports.get_room_name = function(room_id, callback){
  connection.query('SELECT room_name FROM room WHERE room_id = "'+room_id+'"', function(err,row){
    if(row.length > 0){
      callback(row[0].room_name);
    }
    else{
      callback(false);
    }
  });
};

exports.in_room = function(user_id, room_id, callback){
  connection.query('SELECT * FROM userroom WHERE user_id = "'+user_id+'" and room_id = "'+room_id+'"', function(err,row){
    callback(row.length == 1);
  });
};

exports.has_user = function(user_id, callback){
  connection.query('SELECT * FROM user WHERE user_id = "'+user_id+'"', function(err,row){
    callback(row.length == 1);
  });
};

exports.get_user_in_group = function(room_id, callback){
  connection.query('SELECT user.user_id FROM userroom INNER JOIN user on userroom.user_id = user.user_id WHERE room_id = "'+room_id+'"', function(err,row){
    callback(row);
  }); 
};

exports.get_joined_rooms = function(user_id, callback){
  connection.query('SELECT room.room_id, room_name FROM userroom INNER JOIN room on room.room_id = userroom.room_id WHERE userroom.user_id = "'+user_id+'"', function(err,row){
    callback(row);
  }); 
};

exports.get_available_rooms = function(user_id, callback){
  connection.query('SELECT * FROM room where room_id not in (select room_id from userroom where user_id = "'+user_id+'") ORDER BY room_id ASC', function(err,row){
    callback(row);
  }); 
};

exports.join_room = function(user_id, room_id, callback){
  connection.query('INSERT INTO userroom VALUES ("'+user_id+'", "'+room_id+'", (SELECT max(id) FROM msg where room_id = "'+room_id+'" or room_id is null))', function(err,row){
  // connection.query('INSERT INTO userroom VALUES ("'+user_id+'", "'+room_id+'", null)', function(err,row){
    callback(!err);
  }); 
};

exports.set_room_name = function(room_id, room_name, callback){
  connection.query('UPDATE room SET room_name = "'+room_name+'" WHERE room_id = "'+room_id+'"', function(err,row){
    callback(!err);
  }); 
};

exports.leave_room = function(user_id, room_id, callback){
  connection.query('DELETE FROM userroom WHERE user_id = "'+user_id+'" and room_id = "'+room_id+'"', function(err,row){
    callback(!err);
  }); 
};

exports.get_unread = function(user_id, room_id, callback){
  connection.query('SELECT * FROM msg where id > (SELECT last_read FROM userroom WHERE user_id = "'+user_id+'" and room_id = "'+room_id+'") and room_id = "'+room_id+'"', function(err,row){
    callback(row);
  }); 
};

exports.set_last_read = function(user_id, room_id, msg_id, callback){
  connection.query('UPDATE userroom SET last_read = '+msg_id+' WHERE user_id = "'+user_id+'" and room_id = "'+room_id+'"', function(err,row){
    callback(!err);
  }); 
};

exports.get_old_msg = function(room_id, max, callback){
  if(max == null){
    connection.query('SELECT * FROM msg where room_id = "'+room_id+'" ORDER BY id DESC LIMIT 10', function(err,row){
      callback(row);
    });
  } else {
    connection.query('SELECT * FROM msg where id < '+max+' and room_id = "'+room_id+'" ORDER BY id DESC LIMIT 10', function(err,row){
      callback(row);
    });
  }
};