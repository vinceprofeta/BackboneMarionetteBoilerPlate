var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var main = require('./modules/main.js');

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){
  res.sendfile('./public/index.html');
});


var usernames = [];
var numUsers = 0;

io.on('connection', function(socket){
  socket.on('disconnect', function(){
    console.log('user disconnected');
    numUsers = numUsers -1;
  });
  socket.on('chat message', function(msg, user){
    io.emit('chat message', user +': '+msg);
  });
  socket.on('user typing', function(msg, user){
    io.emit('user typing', user +': '+msg);
  });
  socket.on('username', function(msg){
     io.emit('newUser', msg+' '+'Connected');
     numUsers = numUsers +1;
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});