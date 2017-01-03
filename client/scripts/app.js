// YOUR CODE HERE:




var app = {};

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
      console.log('chatterbox: Message sent');
    },
    error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to send message', data);
    }
  });
};

app.fetch = function () {

  var resultsLength = 0;
  
  $.ajax({
    // This is the url you should use to communicate with the parse API server.
    url: this.server,
    type: 'GET',
    contentType: 'application/json',
    success: function (data) {
      console.log('get data', data);
      for (; resultsLength < data.results.length; resultsLength++) {
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

app.renderRoom = function () {

};