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

    socket.on('disconnect', () => {
        console.log('browser disconnected');
    });
});

server.listen(port, () => {
    console.log(`listening on port ${port}`);
});


