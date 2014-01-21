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

  function append_unread(data){
    for(i in data){
      data[i].type = 'userMessage';
      append_message(data[i]);
    }
  }
  function append_message(data){
    date = new Date(data.timestamp);
    timeStr = date.toLocaleTimeString();
    text = "";
    if(data.type === 'systemMessage'){
      text = '<div class="system text-center"><p>' + data.message + '</p></div>';
    } else if(data.type === 'myMessage'){
      text = '<div class="chat"><div class="right"><div class="text"><p class="bubble">' + data.message + '</p><p class="time">'+timeStr+'</p></div></div></div>';
    } else if(data.type === 'userMessage'){
      text = '<div class="chat"><div class="left"><img src="http://lorempixel.com/50/50" alt="" class="avatar"><div class="text"><p class="name">'+data.user_id+'</p><p class="bubble">'+data.message+'</p><p class="time">'+timeStr+'</p></div></div></div>';
    }
    message_area.append(text);
    scroll_down();
  }

  function scroll_down(){
    message_area.animate({ scrollTop: message_area[0].scrollHeight }, "500");
  }

  scroll_down();

  $('.btn-back').click(function(e){
    e.preventDefault();
    window.location.pathname = '/list/'+user_id;
  });

  /* ----------[ socket logic ] ---------- */

  socket.emit('set_user_room_id', { user_id: user_id, room_id: room_id }, function(response){
    response = JSON.parse(response);
    if(!response.success){
      window.location.pathname = '/';
    } else {
      get_unread();
    }
  });

  function get_unread(){
    socket.emit('get_unread', {}, function(response){
      response = JSON.parse(response);
      append_unread(response);
    });
  }

  message_form.submit(function(e){
    e.preventDefault();
    message = message_input.val();
    if(message.length > 0){
      socket.send(JSON.stringify({
        type: 'userMessage',
        message: message
      }));
    }
    message_input.val('');
  });

  $('.btn-leave').click(function(e){
    e.preventDefault();
    if(confirm('Are you sure to leave this group?')) {
      socket.emit('leave_room', { room_id: room_id }, function(response){
        response = JSON.parse(response);
        if(response.success){
          window.location.pathname = '/list/'+user_id;
        }
      });
    } else {
      // console.log('no thanks');
    }
  });

  socket.on('message', function(data){
    data = JSON.parse(data);
    append_message(data);
  });

  socket.on('new_message', function(data, callback){
    append_message(data);
  });

  socket.on('room_name', function(data, callback){
    $('#room_name').html(data.room_name);
  });

});