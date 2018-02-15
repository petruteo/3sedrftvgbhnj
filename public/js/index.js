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

    socket.emit('newMessage', {
        from:'User',
        // text: $(":name-message")[0].val()
        // jQuery('[name-message]').val()
        text: jQuery( '[name=message]' ).val()
    }, () => {

    });
});