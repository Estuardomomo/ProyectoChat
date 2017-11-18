var express = require('express');
var app = express();
const mongo = require('mongodb').MongoClient;
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

var users =[];
var connections = [];
server.listen(process.env.PORT || 3000);
app.get('/',function(req,res){
    res.sendFile(__dirname + '/index.html');
});
mongo.connect('mongodb://127.0.0.1/mongochat', function(err,db){
    
    io.sockets.on('connection',function(socket){
        connections.push(socket);
        console.log('Connected: %s sockets connected', connections.length);
    
        chat.find().limit(100).sort({_id:1}).toArray(function(err,res){
            if(err)
                throw err;
            socket.emit('output', res);
        });

        //Disconnections
        socket.on('disconnect',function(data){
    
            users.splice(users.indexOf(socket.username),1);
            updateUsernames();
            connections.splice(connections.indexOf(socket),1);
            console.log('Disconnected: %s sockets connected', connections.length);
        
        });
        
        //Send Message
        socket.on('send message', function(data){
            console.log(data);
            io.sockets.emit('new message',{msg:data,user: socket.username});
            chat.insert({name: socket.username, message:data}, function(){
                client.emit('output',[data]);
            });

        });
    
        //new User
        socket.on('new user', function(data,callback){
            callback(true);
            socket.username = data;
            users.push(socket.username);
            updateUsernames();
        });
    function updateUsernames(){
        io.sockets.emit('get users', users);
    }
    });
});
