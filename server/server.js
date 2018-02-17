const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {Users} = require('./utils/users.js');


var {generateMessage, generateLocationMessage} = require('./utils/message.js');

const {isRealString} = require ('./utils/validation.js');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);
var users = new Users();

app.use(express.static(publicPath));

io.on('connection',  (socket) => {
    console.log('new user connected');



socket.on('join', (params, callback) => {
    
    console.log('receptionat join server');
    var textControl = `Name and room name has to be strings: ${params.name}, ${params.room} - ${!isRealString(params.name)}, ${!isRealString (params.room)}`;


    if (!isRealString(params.name) || !isRealString (params.room)) {
        return callback(textControl);
    };
    
    
    socket.join(params.room);
    console.log('remove user DACA exista', socket.id);
    users.removeUser(socket.id);
    users.addUser(socket.id, params.name, params.room);
    io.to(params.room).emit('updateUsersList', users.getUserList(params.room));
    
    
    
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
        // console.log('browser disconnected');
        console.log("+++DISCONNECT user sent to be removed", socket.id);
        var user = users.removeUser(socket.id);
        
        if (user) {
            
            // console.log('lista cu userul deconectat scos ', user, user[0].room, '@@@@@@@@@', users.getUserList(user[0].room));
            
            io.to(user.room).emit('updateUsersList', users.getUserList(user.room));
            io.to(user.room).emit('newMessage', generateMessage("Admin", `${user.name} has left the room`));
        }
    });
});



server.listen(port, () => {
    console.log(`listening on port ${port}`);
});


