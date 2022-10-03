const TicketControl = require('../models/ticketControl');

const ticketControl = new TicketControl();

const socketController = (socket) => {
    
    console.log('Cliente conectado', socket.id );

    socket.on('disconnect', () => {
        console.log('Cliente desconectado', socket.id );
    });

    socket.on('next-ticket', ( payload, callback ) => {
        
        const nextTicket = ticketControl.nextTicket();

        callback(nextTicket);

        // Notify new ticket

    });

    socket.emit('last-ticket', ticketControl.lastTicket);

}



module.exports = {
    socketController
}

