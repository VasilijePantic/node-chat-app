var socket = io();


// CONNECT AND DISCONNECT
socket.on('connect', function () {
    console.log('Connected to server.');
});
socket.on('disconnect', function () {
    console.log('Disconnected from server.');
});


// MESSAGES - custom newMessage event listener
socket.on('newMessage', function (message) {
    console.log('New message: ', message);
    var li = $('<li></li>');// we are taking list item from index.html with jQuery
    li.text(`${message.from}: ${message.text}`);// adding -from and -message.text values to text propery in list

    $('#messages').append(li);// appending values from list to OL
});


//generateLocationMessage emmit
socket.on('newLocationMessage', function (message) {
    var li = $('<li></li>');
    var a = $('<a target="_blank">My current Location</a>');

    li.text(`${message.from}: `);
    a.attr('href', message.url);
    li.append(a);
    $('#messages').append(li);
});



$('#message-form').on('submit', function(e) {
    e.preventDefault();// prevents default refresh

    socket.emit('createMessage', {
        from: 'User',
        text: $('[name=message]').val()
    }, function () {

    });
})



// GEOLOCATION
var locationButton = $('#send-location');

locationButton.on('click', function() {//listening for a click event
    if(!navigator.geolocation) {// this is necessary for geolocation to work
        return alert('Geolocation not supported by your browser.');
    }

    navigator.geolocation.getCurrentPosition(function (position) {//gets called with 2 func args
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
    }, function () {// error callback
        alert('Unable to fetch location.');
    });
});