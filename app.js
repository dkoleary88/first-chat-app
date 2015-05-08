//// REQUIRES ////

var express = require('express');
var app = express();
var server = require('http').createServer(app);
var mongoose = require('mongoose');


//// DEFINE DB MODEL ////

var db = mongoose.connect('mongodb://localhost/chatapp');

    var Msg = db.model('Message', {
    	name : String,
        data : String
    });


//// CHAT IO ////

var io = require('socket.io').listen(server);

io.on('connection', function(socket){
	
	socket.on('chat message', function(msg){
		io.emit('chat message', msg);
	});
});


//// ROUTING ////

app.use(express.static(__dirname));
app.get('/', function (request, response) {
	response.sendFile(__dirname + '/index.html');
});

server.listen(3000); 