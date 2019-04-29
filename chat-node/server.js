const mongo = require('mongodb').MongoClient;
const client = require('socket.io').listen(4000).sockets;

//Connect to mongo
mongo.connect('mongodb://localhost:27017',{ useNewUrlParser: true }, (err, clientDb) => {
	if (err) {
		throw err;
	}

    console.log('MongoDb connected');
    
    //Connect to Socket.io
    client.on('connection', (socket) => {
        let db = clientDb.db('mongochat')
        let chat = db.collection('chats');

        //Create function to send status
        sendStatus = (s) => {
            socket.emit('status', s)
        }

        //Get chats from mongo collection
        chat.find().limit(100).sort({_id:1}).toArray((err, res) => {
            if (err) {
                throw err;
            }

            //Emit messages
            socket.emit('output', res);
        })

        //Handle input events
        socket.on('new message', (data) => {
            let username = data.username;
            let message = data.message;

            //Checkc for username and message
            if (username === "" || message === "") {
                sendStatus('Please eneter a name and message');
            } else {
                chat.insert({username: username, message: message}, () => {
                    client.emit('output', [data]);

                    //Send status object
                    sendStatus({
                        message: 'Message Sent',
                        clear: true
                    })
                })
            }


        })

        //Handle clear
        socket.on('clear', (data) => {
            //Remove all chats from collection
            chat.remove({}, () => {
                //Emit cleared
                socket.emit('cleared');
            })
        })
    })
})