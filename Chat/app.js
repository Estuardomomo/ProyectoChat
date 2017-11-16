
const mongo = require('mongodb').MongoClient;
const client = require('socket.io').listen(3000).sockets;

//connecting to mongodb
mongo.connect('mongodb://127.0.0.1/mongochat', function(err,db){
    if(err)
        throw err;

    console.log('Connected');


    //Connected to IO
    client.on('connection',function(socket){
        let chat = db.collection('chats');

        //fucntion to send Status to the client
        sendStatus = function(s){
            socket.emit('Status',s);

        }

        //get chats
        chat.find().limit(100).sort({_id:1}).toArray(function(err,res){
            if(err)
                throw err;
            socket.emit('output', res);
        });

        //intput events
        socket.on('input',function(data){
            let name = data.name;
            let message = data.message;

            //check for name and message
            if(name === "" || message ==="")
                sendStatus('Enter a name or a message.')
            else
                chat.insert({name: name, message:message}, function(){
                    client.emit('output',[data]);
                    sendStatus({
                        message:'Message Sent',
                        clear: true
                    });
                });

        });

    });
});
