var socket = io.connect('/');

var min_msg_id = null;

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
  function append_message(data, prepend){
    if (prepend === undefined) prepend = false;
    date = new Date(data.timestamp);
    timeStr = date.toLocaleTimeString();
    if(data.id){
      if(min_msg_id == null || data.id < min_msg_id){
        min_msg_id = data.id;
      }
    }
    text = "";
    if(data.type === 'systemMessage'){
      text = '<div class="system text-center"><p>' + data.message + '</p></div>';
    } else if(data.type === 'myMessage'){
      text = '<div class="chat"><div class="right"><div class="text"><p class="bubble">' + data.message + '</p><p class="time">'+timeStr+'</p></div></div></div>';
    } else if(data.type === 'userMessage'){
      text = '<div class="chat"><div class="left"><img src="http://lorempixel.com/50/50" alt="" class="avatar"><div class="text"><p class="name">'+data.user_id+'</p><p class="bubble">'+data.message+'</p><p class="time">'+timeStr+'</p></div></div></div>';
    }
    console.log(text);
    console.log(prepend);
    if(prepend)
    {
      message_area.prepend(text);
    }
    else{
      scroll_down();
      message_area.append(text);
    }
    
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
      socket.emit('get_unread',{});
    }
  });

  socket.on('reply_unread', function(data, acknowledge){
    // data = JSON.parse(data);
    console.log(data);
    append_unread(data);
    if(data.length > 0){
      acknowledge({
        status: true,
        user_id: user_id,
        room_id: room_id,
        last_read: data[data.length - 1].id
      });
    } else {
      acknowledge({
        status: false
      });
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
    callback({
      user_id: user_id,
      room_id: room_id,
      last_read: data.id
    });
  });

  $('#room_name').click(function(){
    var name = prompt('Enter new room name', $('#room_name').text());
    if(name){
      socket.emit('change_room_name', {
        room_id: room_id,
        room_name: name
      });
    }
  });

  socket.on('room_name', function(data, callback){
    $('#room_name').html(data.room_name);
  });


  $('#request_old_msg').click(function(e){
    e.preventDefault();
    // remove button
    // if(min_msg_id != null){
      socket.emit('request_old_msg', {
        room_id: room_id,
        max: min_msg_id
      }, function(messages){
        // append to top
        for(i in messages){
          console.log(messages[i]);
          append_message(messages[i], true);
        }
        console.log(messages);
      });
    // }
    // return button
  });


});