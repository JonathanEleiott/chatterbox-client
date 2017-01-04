// YOUR CODE HERE:
var app = {};
var container = {};
var room = 'lobby';
var friends = [];

var myFunction = function () {
  document.getElementById('myDropdown').classList.toggle('show');
};

// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {
    var dropdowns = document.getElementsByClassName('dropdown-content');
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
};

$(document).ready(function() {


  app.server = 'https://api.parse.com/1/classes/messages';


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

  
  app.fetch = function (room) {
    $.ajax({
      // This is the url you should use to communicate with the parse API server.
      url: this.server,
      type: 'GET',
      contentType: 'application/json',
      data: 'order=-createdAt', 
      success: function (data) {
        app.clearMessages();
        console.log('get data', data);
        var filteredData = data.results.filter(function (obj) {
          console.log('inside fetch', room);
          return obj.roomname === room; 
        });
        for (var j = 0; j < filteredData.length; j++) {
          if (!detectXSS(filteredData[j].username) && !detectXSS(filteredData[j].text)) {
            if (friends.indexOf(filteredData[j].username) >= 0) {
              $('#chats').prepend('<div class="messageDiv">' + '<span class="username ' + filteredData[j].username + '"><strong>' + filteredData[j].username + '</strong></span>' + ' : ' + filteredData[j].text + '</div>');
              console.log('inside fetch friends', friends);
            } else {
              $('#chats').prepend('<div class="messageDiv">' + '<span class="username ' + filteredData[j].username + '">' + filteredData[j].username + '</span>' + ' : ' + filteredData[j].text + '</div>');

            }
          }
        }

        for (var i = 0; i < data.results.length; i++) {
          var roomname = data.results[i].roomname;
          if (!detectXSS(roomname)) {
            if (!container[roomname] && roomname !== undefined && roomname !== null && roomname !== '') {
              $('#myDropdown').append('<a href="#" class="nameOfRoom">' + roomname + '</a>');
              container[roomname] = roomname;
            }
          }
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

  app.renderRoom = function (room) {
    clearInterval(startInterval);
    startInterval = setInterval(function () {
      app.fetch(room);
    }, 2000);
    $('#roomSelect').append('<div></div>');
    console.log($('#roomSelect').children());

  };


  var startInterval = setInterval(function() {
    app.fetch(room);
  }, 5000);

  $('.newroom').click(function () {
    room = prompt('What room would you like to join?');
    app.renderRoom(room);
  });

  var detectXSS = function (string) {
    var char = ['<', '>', '[', ']', "'", '"', '(', ')', '&', '|', '!', '=', '+', '{', '}', '@', '`' ];
    if (string === undefined || string === null) {
      return true;
    }
    for (var i = 0; i < char.length; i++) {
      if (string.split(char[i]).length > 1 ) {
        return true;
      }
    }
    return false;
  };

  app.handleUsernameClick = function () {
    
  };

  app.init = function () {

  };

});

