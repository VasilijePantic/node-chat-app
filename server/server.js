const express = require('express');
const http = require('http');
const path = require('path');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');
const publicPath = path.join(__dirname, '../public');
const port = 3000 || process.env.PORT;
var app = express(); 

// setting up server for socket.io
var server = http.createServer(app); // call to http to create a server is the same as .liste()
var io = socketIO(server);


app.use(express.static(publicPath));

io.on('connection', (socket) => {// io.on - special event for connectio
    console.log('New user connected.');

    // socket.emit - EMITS AN EVENT TO A SIGNLE CONNECTION

    socket.emit('newMessage', generateMessage('Admin', 'Welcome to chat app'));

    socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'));


    // createMessage event
    socket.on('createMessage', (message, callback) => {// callback arg is for event acknowledgement 
        console.log('Create message: ', message);
        // newMessage event
        io.emit('newMessage', generateMessage(message.from, message.text));
        callback();// we send data by providing 1 arg to callback
    });


    // location
    socket.on('createLocationMessage', (coords) => {
        io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
    });




    //===============================   
    socket.on('disconnect', () => {// .on uses an already existing event such as disconnect
        console.log('Disconnected from server.');
    });
});






//===========================
server.listen(port, () => {
    console.log(`Server up on port: ${port}`);
});
