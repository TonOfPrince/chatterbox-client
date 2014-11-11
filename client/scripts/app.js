// YOUR CODE HERE:
$(document).ready(function () {

  var getFunc = function() {

    $.ajax({
      url: 'https://api.parse.com/1/classes/chatterbox',
      type: 'GET',
      data: {limit: 20, order: "-createdAt"},
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


  var submitFunc = function() {
    var value = $(".userInput").val();
    var user = window.location.search.substring(10);
    var message = {'username': user, 'text': value, 'roomname':'lobby'};
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

  // create form
  $("#main").append("<input type='text' class='userInput'><input type='button' class='submitMessage'>");

  // submits a message on click
  $(".submitMessage").on('click', submitFunc);

  // print out chats
  $("#main").append("<ul class='messageList'></ul>");

  var messageWriter = function(data) {

    var chatter = '';
    for (var i = 0; i < data.length; i++) {
      chatter += "<li>" + encodeURIComponent(data[i].username) + ": " + encodeURIComponent(data[i].text) + "</li>";
    }
    $('.messageList').html('');
    $(".messageList").append(chatter);

    console.log(data);
  };

});

