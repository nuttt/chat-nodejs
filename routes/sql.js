var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : '127.0.0.1',
  user     : 'root',
  password : '',
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

exports.have_user = function(user_id){

};
