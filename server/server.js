const path = require('path');
const http = require('http');
const express = require('express');


const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

const socketIO = require('socket.io');



var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection',  (socket) => {
    console.log('new user connected');

// socket.emit('newEmail', {
//     from: 'mike@example.com',
//     text: 'hey, my text here',
//     createdAt: 123
// });

// socket.on('createEmail', (newEmail) => {
// console.log('createEmail', newEmail);
// });

socket.emit('newMessage', {
    from: 'Admin',
    text: 'welcome to chat app'
});

socket.broadcast.emit('newMessage', {
    from: 'Admin',
    text: 'a new user joined the chat'
});
 
socket.on('createMessage', (message) => {
    console.log('new message received', message);
    io.emit('createMessage', {
        from: message.from,
        text: message.text,
        createdAt: new Date().getTime()
    });

// socket.broadcast.emit('newMessage', {
//         from: message.from,
//         text: message.text,
//         createdAt: new Date().getTime()

//     });

});
 



socket.on('disconnect', () => {
        console.log('browser disconnected');
    });
});



server.listen(port, () => {
    console.log(`listening on port ${port}`);
});


