var socket = io();

socket.on('connect', function () {
    console.log('Connected to server.');
});

socket.on('disconnect', function () {
    console.log('Disconnected from server.');
});


// custom newMessage event listener
socket.on('newMessage', function (message) {
    console.log('New message: ', message);
});

