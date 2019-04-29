const http = require('http');
const polka = require('polka');
const io = require('socket.io');
const sirv = require('sirv');
const mongo = require('mongodb').MongoClient;

const { PORT = 4000 } = process.env;

const files = sirv('public');
const server = http.createServer();

polka({ server }).use(files).listen(PORT, err => {
	if (err) throw err;
	console.log(`> Running on localhost:${PORT}`);
});

//Connect to mongo
mongo.connect('mongodb://localhost:27017', { useNewUrlParser: true }, (err, clientDb) => {
	if (err) {
		throw err;
	}

	console.log('MongoDb connected');



	// Chatroom
	let numUsers = 0;
	io(server).on('connection', socket => {
		let added = false;
		let db = clientDb.db('mongochat')
        let chat = db.collection('chats');

		// when the client emits 'new message', this listens and executes
		socket.on('new message', data => {
			// we tell the client to execute 'new message'
			console.log(data);

			chat.insertOne({id: socket.username ,username: socket.username, senderName: socket.username, message: data}, () => {
				socket.broadcast.emit('new message', {
					username: socket.username,
					message: data
				});
			})

			
		});

		// when the client emits 'add user', this listens and executes
		socket.on('add user', username => {
			if (added) return;

			// we store the username in the socket session for this client
			socket.username = username;
			++numUsers;
			added = true;
			//Get chats from mongo collection
			chat.find().limit(100).sort({_id:1}).toArray((err, res) => {
				if (err) {
					throw err;
				}
	
				//Emit messages
				socket.emit('login', { numUsers, res });
			})
			// socket.emit('login', { numUsers });
			// echo globally (all clients) that a person has connected
			
			socket.broadcast.emit('user joined', { username, numUsers });
		});

		// when the client emits 'typing', we broadcast it to others
		socket.on('typing', _ => socket.broadcast.emit('typing', { username: socket.username }));

		// when the client emits 'stop typing', we broadcast it to others
		socket.on('stop typing', _ => socket.broadcast.emit('stop typing', { username: socket.username }));

		// when the user disconnects.. perform this
		socket.on('disconnect', _ => {
			if (added) {
				--numUsers;
				// echo globally that this client has left
				socket.broadcast.emit('user left', { numUsers, username: socket.username });
			}
		});
	});
})