var socket = io();


// AUTOSCROLL BOT
function scrollToBottom () {
    //selectors
    var messages = $('#messages');
    var newMessage = messages.children('li:last-child');//selecting list item for auto-scrolling   
    //heights
    var clientHeight = messages.prop('clientHeight');
    var scrollTop = messages.prop('scrollTop');
    var scrollHeight = messages.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight();//moves us to a previous child

    if(clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
        messages.scrollTop(scrollHeight);
    }
}



// CONNECT AND DISCONNECT
socket.on('connect', function () {
    // room joining
    var params = $.deparam(window.location.search);// getting params from the window

    socket.emit('join', params, function (err) {
        if (err) {
            alert(err);
            window.location.href = '/';//get the user to root page by setting href to '/'
        } else {
            console.log('No error');
        }
    });
});
socket.on('disconnect', function () {
    console.log('Disconnected from server.');
});


// UPDATE USERS LIST
socket.on('updateUserList', function (users) {
    var ol = $('<ol></ol>');//creating an OL

    users.forEach(function (user) {// going through users arr
        ol.append($('<li></li>').text(user));// appending the element
    });

    $('#users').html(ol);
});




// newMessage - custom newMessage event listener
socket.on('newMessage', function (message) {
    var formattedTime = moment(message.createdAt).format('h:mm a');
    var template = $('#message-template').html();

    var html = Mustache.render(template, {
        text: message.text,
        from: message.from,
        createdAt: formattedTime
    });

    $('#messages').append(html);
    scrollToBottom();
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
    scrollToBottom();
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