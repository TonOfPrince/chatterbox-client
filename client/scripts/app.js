// YOUR CODE HERE:
var friendList = {};
var addFriend = function() {
  var value = $(this)[0].innerText;
  var lowerVal = value.toLowerCase();
  if (!friendList[lowerVal]) {
    friendList[lowerVal] = value;
  }
}

$(document).ready(function () {

  var currentRoom = 'lobby';
  var roomList = {};

  var submitFunc = function() {
    var value = $(".userInput").val();
    var user = window.location.search.substring(10);
    var message = {'username': user, 'text': value, 'roomname': currentRoom};
    console.log(JSON.stringify(message));
    $.ajax({
      url: 'https://api.parse.com/1/classes/chatterbox',
      type: 'POST',
      data: JSON.stringify(message),
      contentType: 'application/json',
      success: function () {
        console.log('works!');
      },
      error: function () {
        // see: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to send message');
      }
    });
  };

 var befriend = function() {
    console.log(44);
  };

  var makeNewRoom = function() {
    var value = $(".roomInput").val();
    var lowerVal = value.toLowerCase();
    if (!roomList[lowerVal]) {
      roomList[lowerVal] = value;
      $('.roomList').append("<option value='" + lowerVal + "'>" + value + "</option>");
    }
    // else {
    //   alert('Already a room!');
    // }
  };

  var changeRooms = function() {
    var value = $(".roomList").val();
    console.log(value);
    var lowerVal = value.toLowerCase();
    currentRoom = lowerVal;
    console.log(currentRoom);
  };




  //room id
  $("#main").append("<select class='roomList'><option value='lobby'>Lobby</option></select><br><input type='button' class='createRoom'><input type='text' class='roomInput'><br><br>");

  $(".roomList").on('change',changeRooms);


  $(".createRoom").on('click',makeNewRoom);

  // create form
  $("#main").append("<input type='text' class='userInput'><input type='button' class='submitMessage'>");

  // submits a message on click
  $(".submitMessage").on('click', submitFunc);

  // print out chats
  $("#main").append("<ul class='messageList'></ul>");

// $(this).parent().addClass('friend');

  var messageWriter = function(data) {

    var chatter = '';
    for (var i = 0; i < data.length; i++) {
      if (data[i].roomname === currentRoom) {
        var friendLower = data[i].username;
        if (friendList[friendLower.toLowerCase()]) {
          chatter += "<li class='friend'><span class='random' onclick='addFriend.call(this)' >" + encodeURIComponent(data[i].username) + "</span>: " + encodeURIComponent(data[i].text) + "</li>";
        } else {
          chatter += "<li><span class='random' onclick='addFriend.call(this)' >" + encodeURIComponent(data[i].username) + "</span>: " + encodeURIComponent(data[i].text) + "</li>";
        }
      }
    }
    $('.messageList').html('');
    $(".messageList").append(chatter);

    console.log();
  };

  var getFunc = function() {
    $.ajax({
      url: 'https://api.parse.com/1/classes/chatterbox',
      type: 'GET',
      data: {limit: 100, order: "-createdAt"},
      contentType: 'application/json',
      success: function (data) {
        messageWriter(data.results);
      },
      error: function () {
        // see: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to send message');
      }
    });
  };

  getFunc();
  setInterval(getFunc, 1000);
});

