window.socket = new WebSocket("ws://localhost:8080/ws");

function sendMessage(msg)
{
	var len = '' + msg.length
	while (len.length < 5) len += ' '
	socket.send(len + msg)
}

function handleSubmit(msg)
{
	var el = document.getElementById("chat-msg")
	sendMessage(el.value)
	el.value = ''

	return false;
}

function displayMessage(msg)
{
	var container = document.getElementById("container");

	var div = document.createElement("div");
	var text = document.createTextNode(msg.data);

	div.appendChild(text);
	container.appendChild(div);
}


function setUpSocket(onmessage)
{

	socket.onopen = function() {
	  console.log("Connected");
	};
	
	socket.onclose = function(event) {
	  if (event.wasClean) {
	    console.log('Connection closed');
	  } else {
	    console.log('ERROR: Conection reset'); // например, "убит" процесс сервера
		console.log('Code: ' + event.code + ' reason: ' + event.reason);
	  }
	};
	
	socket.onmessage = onmessage;
	
	socket.onerror = function(error) {
	  console.log("Error " + error.message);
	};
} 