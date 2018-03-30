var socket = io();


// CONNECT AND DISCONNECT
socket.on('connect', function () {
    console.log('Connected to server.');
});
socket.on('disconnect', function () {
    console.log('Disconnected from server.');
});


// custom newMessage event listener
socket.on('newMessage', function (message) {
    console.log('New message: ', message);
    var li = $('<li></li>');// we are taking list item from index.html with jQuery
    li.text(`${message.from}: ${message.text}`);// adding -from and -message.text values to text propery in list

    $('#messages').append(li);// appending values from list to OL
});


$('#message-form').on('submit', function(e) {
    e.preventDefault();// prevents default refresh

    socket.emit('createMessage', {
        from: 'User',
        text: $('[name=message]').val()
    }, function () {

    });
})