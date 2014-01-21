
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var chat = require('./routes/chat')
var http = require('http');
var path = require('path');

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

app.get('/', routes.index);
app.get('/users', user.list);
app.get('/chat/:user_id/:group_id', chat.index);


server = http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

require('./routes/socket').initialize(server);

var sql = require('./routes/sql');
sql.get_available_groups('Vibhavee.T', function(result){
  console.log(result);
});
// sql.get_joined_groups('Vibhavee.T', function(result){
//   console.log(result);
// });

// sql.join_group('Vibhavee.T', 2, function(result){
//   console.log(result);
//  sql.get_joined_groups('Vibhavee.T', function(result){
//    console.log(result);
//  });
// });

// sql.leave_group('Vibhavee.T', 2, function(result){
//   console.log(result);
//   sql.get_joined_groups('Vibhavee.T', function(result){
//     console.log(result);
//   });
// });

// sql.get_unread('Vibhavee.T', 1, function(result){
//   console.log(result);
// });

// sql.set_last_read('Vibhavee.T', 1, 2, function(result){
//   console.log(result);
//   sql.get_unread('Vibhavee.T', 1, function(result){
//     console.log(result);
//   });
// });

// sql.get_user_in_group(1, function(result){
//   console.log(result);
// });