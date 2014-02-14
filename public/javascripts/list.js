var socket = io.connect('/');

var url = document.URL;
var pattern = /.*\/(.*)/;
var url_match = pattern.exec(url);

var user_id = url_match[1];

$(function(){

  var joined_groups = $('#joined');
  var available_groups = $('#available');

  function append_message(data){
    for(i in data.joined){
      joined_groups.append('<div data-id="'+ data.joined[i].room_id +'" class="item"><img src="/images/group/'+(data.joined[i].room_id%30)+'.jpeg" alt="">'+ data.joined[i].room_name +'</div>');
    }
    for(i in data.available){
      available_groups.append('<div data-id="'+ data.available[i].room_id +'" class="item"><img src="/images/group/'+(data.available[i].room_id%30)+'.jpeg" alt="">'+ data.available[i].room_name +'</div>');
    }
  }

  joined_groups.on('click', '.item', function(){
    var room_id = $(this).data('id');
    window.location.pathname = '/chat/'+user_id+'/'+room_id;
  });

  available_groups.on('click', '.item', function(){
    var room_id = $(this).data('id');
    var room_name = $(this).text();
    if (confirm('You are not a member of "'+room_name+'" group, want to join?')) {
      socket.emit('join_room', { room_id: room_id }, function(response){
        response = JSON.parse(response);
        if(response.success){
          window.location.pathname = '/chat/'+user_id+'/'+room_id;
        }
      });
    } else {
      // console.log('no thanks');
    }
  });


  /* ----------[ socket logic ] ---------- */

  socket.emit('set_user_id', { user_id: user_id }, function(response){
    response = JSON.parse(response);
    if(!response.success){
      window.location.pathname = '/';
    }
  });

  socket.on('message', function(data){
    data = JSON.parse(data);
    append_message(data);
  });

  $('#new-group').click(function(e){
    e.preventDefault();
    var room_name = prompt('Enter new room name', $('#room_name').text());
    socket.emit('new_room', {room_name: room_name}, function(){
      location.reload();
    });
  });

});