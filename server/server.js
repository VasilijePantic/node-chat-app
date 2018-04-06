const express = require('express');
const http = require('http');
const path = require('path');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');
const publicPath = path.join(__dirname, '../public');

const port = 3000 || process.env.PORT;
var app = express(); 

// setting up server for socket.io
var server = http.createServer(app); // call to http to create a server is the same as .liste()
var io = socketIO(server);
var users = new Users();


app.use(express.static(publicPath));

// socket.emit - EMITS AN EVENT TO A SIGNLE CONNECTION

io.on('connection', (socket) => {// io.on - special event for connectio
    console.log('New user connected.');

    // event listener - 'join'
    socket.on('join', (params, callback) => {
        if(!isRealString(params.name) || !isRealString(params.room)) {
            return callback('Name and room name are required!');
        }

        // joining room with socket
        socket.join(params.room);// user joins the room

        users.removeUser(socket.id);// we remove them from any previous rooms
        users.addUser(socket.id, params.name, params.room);// we add the user to the room

        //emmiting the call to updateUserList
        io.to(params.room).emit('updateUserList', users.getUserList(params.room));

        socket.emit('newMessage', generateMessage('Admin', 'Welcome to chat app'));
        // .to() will select a specific room
        socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined!`));
        callback();
    });



    // createMessage event
    socket.on('createMessage', (message, callback) => {// callback arg is for event acknowledgement 
        var user = users.getUser(socket.id);

        if(user && isRealString(message.text)) {// if there is a user and if if text passed is valid
            io.to(user.room).emit('newMessage', generateMessage(user.name, message.text));// emit message            
        }

        callback();// we send data by providing 1 arg to callback
    });


    
    // location
    socket.on('createLocationMessage', (coords) => {
        var user = users.getUser(socket.id);

        if(user) {
            io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude, coords.longitude));
        }
        
    });




    //===============================   
    socket.on('disconnect', () => {// .on uses an already existing event such as disconnect
        var user = users.removeUser(socket.id);//storing removed users

        if(user) {// if the user was removed,
            io.to(user.room).emit('updateUserList', users.getUserList(user.room));//update user list
            io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left.`));// print a message from admin
        }
    });
});






//===========================
server.listen(port, () => {
    console.log(`Server up on port: ${port}`);
});
