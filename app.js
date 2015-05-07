var express = require('express');
var app = express();
var server = require('http').createServer(app);

// CHAT IO //
var io = require('socket.io').listen(server);

io.on('connection', function(socket){
	
	socket.on('chat message', function(msg){
		io.emit('chat message', msg);
	});
});

// ROUTING: //
app.get('/', function (request, response) {
	response.sendFile(__dirname + '/index.html');
});

server.listen(3000); 