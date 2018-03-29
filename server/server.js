const express = require('express');
const http = require('http');
const path = require('path');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = 3000 || process.env.PORT;
var app = express(); 

// setting up server for socket.io
var server = http.createServer(app); // call to http to create a server is the same as .liste()
var io = socketIO(server);


app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('New user connected.');

    socket.on('disconnect', () => {
        console.log('Disconnected from server.');
    });
});






//===========================
server.listen(port, () => {
    console.log(`Server up on port: ${port}`);
});
