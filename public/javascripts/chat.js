var socket = io.connect('/');

$(function(){

  var message_input = $('#msg');
  var message_form = $('#form');
  var message_area = $('#content');

  var url = document.URL;
  var pattern = /.*\/(.*)\/(.*)/;
  var url_match = pattern.exec(url);
  
  var user_id = url_match[1];
  var room_id = url_match[2];

  function append_message(data){
    if(data.type === 'systemMessage'){
      message_area.append('<div class="system text-center"><p>' + data.message + '</p></div>');
    } else if(data.type === 'myMessage'){
      message_area.append('<div class="chat"><div class="right"><div class="text"><p class="bubble">' + data.message + '</p><p class="time">6:37 PM</p></div></div></div>');
    } else if(data.type === 'userMessage'){
      message_area.append('<div class="chat"><div class="left"><img src="http://lorempixel.com/50/50" alt="" class="avatar"><div class="text"><p class="name">'+data.user_id+'</p><p class="bubble">'+data.message+'</p><p class="time">6:37 PM</p></div></div></div>');
    }
  }

  /* ----------[ socket logic ] ---------- */

  socket.emit("set_user_id", { user_id: user_id, room_id: room_id }, function(response){
    response = JSON.parse(response);
    console.log(response);
    console.log(typeof response);
    if(!response.success){
      window.location.pathname = "/";
    }
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
    append_message(data);
  });

});