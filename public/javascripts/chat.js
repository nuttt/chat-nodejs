var socket = io.connect('/');

$(function(){

  var message_input = $('#msg');
  var message_form = $('#form');
  var message_area = $('#content');

  var url = document.URL;
  var pattern = /.*\/(.*)\/(.*)/;
  var url_match = pattern.exec(url);
  
  var user_id = url_match[1];
  var group_id = url_match[2];

  function append_message(type, message){
    if(type === 'systemMessage'){
      message_area.append('<div class="system text-center"><p>' + message + '</p></div>');
    }
  }

  /* ----------[ socket logic ] ---------- */

  socket.emit("set_user_id", { user_id: user_id }, function(response){
    console.log(response);
  });

  message_form.submit(function(e){
    e.preventDefault();
    message = message_input.val();
    if(message.length > 0){
      socket.send(JSON.stringify({
        type: 'userMessage',
        message: message
      }));
    }
    message_input.val("");
  });

  socket.on("message", function(data){
    data = JSON.parse(data);
    append_message(data.type, data.message);
  });

});