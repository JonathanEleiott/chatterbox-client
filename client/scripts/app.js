// YOUR CODE HERE:

// var message = {
//   username: 'jon',
//   text: 'hai',
//   roomname: 'HR'
// };

// $.ajax({
//   // This is the url you should use to communicate with the parse API server.
//   url: 'https://api.parse.com/1/classes/messages',
//   type: 'POST',
//   data: JSON.stringify(message),
//   contentType: 'application/json',
//   success: function (data) {
//     console.log('chatterbox: Message sent');
//   },
//   error: function (data) {
//     // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
//     console.error('chatterbox: Failed to send message', data);
//   }
// });



var getMessages = function() {

  $.ajax({
    // This is the url you should use to communicate with the parse API server.
    url: 'https://api.parse.com/1/classes/messages',
    type: 'GET',
    contentType: 'application/json',
    success: function (data) {
      for (var i = 0; i < data.results.length; i++) {
        $('#messages').append('<div>' + data.results[i].username + ' : ' + data.results[i].text + '</div>');
      }      
    },
    error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('failed to retrieve', data);
    }
  });
};

$(document).ready(function() {

  setInterval(function() {
    $('#messages').append(getMessages());
  }, 1000);

});