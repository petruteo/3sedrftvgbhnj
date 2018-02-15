var socket = io();

socket.on('connect', () => {
            console.log('connected to server');

        });

socket.on('newMessage', (message) => {
            console.log('mesaj primit de la server', message);
           var li = jQuery('<li></li>');
           li.text(`${message.from}: ${message.text}`);
           jQuery('#messages').append(li);
        });

socket.on('newLocationMessage', (message) => {
    var li =jQuery('<li></li>');
    var a = jQuery('<a target="_blank">My location<a>');
    
    li.text(`${message.from}: `);
    a.attr('href', message.url);
    li.append(a);
    jQuery('#messages').append(li);

});

socket.on('disconnect', () => {
            console.log('disconenected from server');
        });


// socket.emit('createMessage', {
//     from: 'Frank',
//     text: 'dsadsadasda'
// }, (data) => {
//     console.log('got it', data);
// });

jQuery('#message-form').on('submit', (e) => {
    e.preventDefault();

    var messageTextBox = jQuery('[name=message]');

    socket.emit('newMessage', {
        from:'User',
        // text: $(":name-message")[0].val()
        // jQuery('[name-message]').val()
        text: messageTextBox.val()
    }, () => {
        messageTextBox.val('');
    });
});

var locationButton = jQuery('#send-location');
locationButton.on('click', () => {
    if (!navigator.geolocation) {
        return alert('geolocation not supported by your browser');
    }
    locationButton.attr('disabled', 'disabled').text('Waiting');

    navigator.geolocation.getCurrentPosition((position) => {
        locationButton.removeAttr('disabled').text('Send location');
        console.log(position);
        socket.emit('newLocationMessage', position.coords.latitude, position.coords.longitude);

    },  () => {
        locationButton.removeAttr('disabled').text('Send location');
        alert('you did not allow location. why dude, why? :)')
    }
)
});

// locationButton.attr('disabled', 'disabled');