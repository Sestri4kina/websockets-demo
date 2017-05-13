//var WebSocket = require('ws');

window.onload = function() {

  var form = document.getElementById('message-form');
  var messageField = document.getElementById('message');
  var messagesList = document.getElementById('messages');
  var socketStatus = document.getElementById('status');
  var closeBtn = document.getElementById('close');

  //create a new websocket connection
  var socket = new Websocket('ws://echo.websocket.org');
  //showing the user that connection has been established
  socket.onopen = function(event) {
    socketStatus.innerHTML = 'Connected to: ' + event.currentTarget.URL;
    socketStatus.className = 'open';
  };
  //handling errors
  socket.onerror = function(error) {
    console.log("Websocket error is: " + error);
  };
  //you can send both text and binary data through
  form.onsubmit = function(e) {
    e.preventDefault();
    var message = messageField.value;
    //send the message through Websocket
    socket.send(message);
    messageList.innerHTML += '<li class="sent"><span>Sent:</span>' + message +
                            '</li>';
    messageField.value = '';
    return false;
  };
  //this event listener is fired when a new message is recieved
  //this event includes data property to access the contents of a message
  socket.onmessage = function(event) {
    var message = event.data;
    messageList.innerHTML += '<li class="received"><span>Received:</span>' +
                             message + '</li>';
  };

  socket.onclose = function(event) {
    socketStatus.innerHTML = 'Disconnected from WebSocket.';
    socketStatus.className = 'closed';
  };
  //close the Websocket connection when the closeBtn is clicked
  closeBtn.onclick = function(e) {
    e.preventDefault();
    socket.close();
    return false;
  };


};
