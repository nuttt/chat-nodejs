
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var chat = require('./routes/chat');
var list = require('./routes/list');
var http = require('http');
var path = require('path');
var mysql = require('mysql');
var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.configure('development', function() {
  console.log('Using development settings.');
  app.set('connection', mysql.createConnection({
    host: '127.0.0.1',
    database: 'node_chat',
    user: 'node',
    port: '3306',
    password: 'node'}));
  app.use(express.errorHandler());
});

app.configure('production', function() {
  console.log('Using production settings.');
  app.set('connection', mysql.createConnection({
    host: process.env.RDS_HOSTNAME,
    database: 'node_chat',
    user: process.env.RDS_USERNAME,
    password: process.env.RDS_PASSWORD,
    port: process.env.RDS_PORT}));
});

app.get('/', routes.index);
app.get('/users', user.list);
app.get('/chat/:user_id/:group_id', chat.index);
app.get('/list/:user_id', list.index);


server = http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

var sql = require('./routes/sql');
sql.set_connection(app.get('connection'));
require('./routes/socket').initialize(server, sql);


// sql.get_available_groups('Vibhavee.T', function(result){
//   console.log(result);
// });
// sql.get_joined_groups('Vibhavee.T', function(result){
//   console.log(result);
// });

// sql.join_group('Vibhavee.T', '2', function(result){
//   console.log(result);
//  sql.get_joined_groups('Vibhavee.T', function(result){
//    console.log(result);
//  });
// });

// sql.leave_group('Vibhavee.T', '2', function(result){
//   console.log(result);
//   sql.get_joined_groups('Vibhavee.T', function(result){
//     console.log(result);
//   });
// });

// sql.get_unread('Jamorn.S', '15', function(result){
//   console.log(result);
// });

// sql.set_last_read('Vibhavee.T', '4', 2, function(result){
//   console.log(result);
//   sql.get_unread('Vibhavee.T', '4', function(result){
//     console.log(result);
//   });
// });

// sql.get_user_in_group('4', function(result){
//   console.log(result);
// });

// sql.add_message('Nuttapon.P', '4', 'test3', function(response){
//   console.log(response);
// });

// sql.get_room_name('4', function(result){
// 	console.log(result);
// });