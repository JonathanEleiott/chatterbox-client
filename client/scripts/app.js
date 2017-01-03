// YOUR CODE HERE:
var app = {};

$(document).ready(function() {


  app.server = 'https://api.parse.com/1/classes/messages';

  app.init = function () {

  };

  app.send = function (message) {
    console.log('inside send');
    $.ajax({
      // This is the url you should use to communicate with the parse API server.
      url: this.server,
      type: 'POST',
      data: JSON.stringify(message),
      contentType: 'application/json',
      success: function (data) {
        app.fetch();
        console.log('chatterbox: Message sent');
      },
      error: function (data) {
        // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to send message', data);
      }
    });
  };

  
  app.fetch = function () {
    
    $.ajax({
      // This is the url you should use to communicate with the parse API server.
      url: this.server,
      type: 'GET',
      contentType: 'application/json',
      data: 'order=-createdAt',
      success: function (data) {
        console.log('get data', data);
        for (var resultsLength = data.results.length - 1; resultsLength > data.results.length - 101; resultsLength--) {
          $('#chats').append('<div>' + data.results[resultsLength].username + ' : ' + data.results[resultsLength].text + '</div>');
        }      
      },
      error: function (data) {
        // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('failed to retrieve', data);
      }
    });
  };

  app.clearMessages = function () {
    $('#chats').empty();

  };

  app.renderMessage = function (message) {
    $('#chats').append('<div>' + message.username + ' : ' + message.text + '</div>');
  };


  //press button
    // render
    // send 

  // fetch is running on selected room forever and always

  app.renderRoom = function (room) {
    $('#roomSelect').append('<a href="#">' + room + '</a>');
  };

  app.handleUsernameClick = function () {

  };

  // var message = {
  //   username: 'Mel Brooks',
  //   text: 'It\'s good to be the king',
  //   roomname: 'lobby'
  // };

  // app.renderMessage(message);


});
