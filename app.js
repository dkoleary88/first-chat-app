//// REQUIRES ////

var express = require('express');
var app = express();
var server = require('http').createServer(app);
var mongoose = require('mongoose');


//// DEFINE MONGODB MODEL ////

var db = mongoose.connect('mongodb://localhost/chatapp');

var Schema = mongoose.Schema;
var msgSchema = Schema({
    	name : String,
        data : String	
});

var Msg = db.model('Message', msgSchema);


//// CHAT SOCKET.IO ////

var io = require('socket.io').listen(server);

io.on('connection', function(client){
	
	// when a chat message is sent from the client
	client.on('chat message', function(msg){
		io.emit('chat message', msg);
		Msg.create({
			name: msg.name,
			data: msg.data
		});
	});

	// when a user joins the chat
	client.on('join', function(name){
		io.emit('join', name);

		// emit previously stored messages to the client
		Msg.find({}).exec(function(err, msgs){
			msgs.forEach(function(m){
				client.emit('chat message',m);
			});
		});
	});

});


//// ROUTING ////

app.use(express.static(__dirname));

server.listen(3000); 