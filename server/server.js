const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');


var {generateMessage, generateLocationMessage} = require('./utils/message.js');

const {isRealString} = require ('./utils/validation.js');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection',  (socket) => {
    console.log('new user connected');



socket.on('join', (params, callback) => {
    
    if (!isRealString(params.name) || !isRealString (params.room)) {
        callback('Name and room name has to be strings');
        
    }
    
    socket.join(params.room);
    // socket.leave(params.room);

    //io.emit - for all io.to(params.room).emit
    // socket.broadcast.emit - all - current user socket.broadcast.to(params.room).emit
    // socket.emit

    socket.emit('newMessage', generateMessage('Admin', 'welcome to chat app'));
    socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin',`${params.name} has joined the room ${params.room}`));
    
    callback();

});

socket.on('newMessage', (message, callback) => {
    console.log('new message received: ', message);
    io.emit('newMessage', generateMessage(message.from, message.text));
    callback('This from the server.');
});
 
socket.on('newLocationMessage', (latitude, longitude) => {
    // console.log('+++++coordonate', coords);
    io.emit('newLocationMessage', generateLocationMessage('Admin', latitude, longitude));
});
 

socket.on('disconnect', () => {
        console.log('browser disconnected');
    });
});



server.listen(port, () => {
    console.log(`listening on port ${port}`);
});


