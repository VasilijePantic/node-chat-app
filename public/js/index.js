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
    var formattedTime = moment(message.createdAt).format('h:mm a');
    var template = $('#message-template').html();

    var html = Mustache.render(template, {
        text: message.text,
        from: message.from,
        createdAt: formattedTime
    });

    $('#messages').append(html);

});


//generateLocationMessage emmit
socket.on('newLocationMessage', function (message) {
    var formattedTime = moment(message.createdAt).format('h:mm a');
    var template = $('#location-message-template').html();

    var html = Mustache.render(template, {
        from: message.from,
        url: message.url,
        createdAt: formattedTime
    });

    $('#messages').append(html);
});



$('#message-form').on('submit', function(e) {
    e.preventDefault();// prevents default refresh

    var messageTextbox = $('[name=message]');

    socket.emit('createMessage', {
        from: 'User',
        text: messageTextbox.val()
    }, function () {
        messageTextbox.val('');//to clear the field
    });
})



// GEOLOCATION
var locationButton = $('#send-location');

locationButton.on('click', function() {//listening for a click event
    if(!navigator.geolocation) {// this is necessary for geolocation to work
        return alert('Geolocation not supported by your browser.');
    }

    locationButton.attr('disabled', 'disabled').text('Sending location...');// it will disable button

    navigator.geolocation.getCurrentPosition(function (position) {//gets called with 2 func args
        locationButton.removeAttr('disabled').text('Send location');// if success - it will re-enable the button
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
    }, function () {// error callback
        locationButton.removeAttr('disabled').text('Send location');
        alert('Unable to fetch location.');
    });
});