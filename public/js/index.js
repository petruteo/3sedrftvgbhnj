var socket = io();

socket.on('connect', () => {
            console.log('connected to server');

            // socket.emit('createEmail', {
            //     from: 'petru@exe.com',
            //     text: "ce faci ba",
            //     createdAt: 321
            // });

            // socket.emit('createMessage', {
            //     from: "Mariusila",
            //     text: "mesaj de la client"
        
            // });

            
        });

socket.on('newMessage', (message) => {
            console.log('mesaj primit de la server', message);
            document.write('mesaj primit de la server');
        });
        
socket.on('disconnect', () => {
            console.log('disconenected from server');
        });

socket.on('newEmail', (email) => {
    console.log('new email', email);
});