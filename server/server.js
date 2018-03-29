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

io.on('connection', (socket) => {// io.on - special event for connectio
    console.log('New user connected.');

    // socket.emit - EMITS AN EVENT TO A SIGNLE CONNECTION
    

    // custom createMessage event listener
    socket.on('createMessage', (message) => {
        console.log('Create message: ', message);

        // io.emit - EMITS AN EVENT TO EVERY CONNECTION
        io.emit('newMessage', {
            from: message.from,
            text: message.text,
            createdAt: new Date().getTime()
        });
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
