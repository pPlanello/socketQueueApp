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

    socket.on('attend-ticket', (desktop, callback) => {
        if (!desktop) {
            return callback({
                ok: false,
                msg: 'Desktop is mandatory'
            });
        }

        const ticket = ticketControl.attendTicket(desktop);

        // Notify the last4tickets
        
        if (!ticket) {
            return callback({
                ok: false,
                msg: 'There are no tickets to attend'
            });
        }

        return callback({
            ok: true,
            ticket: ticket
        });
    });

    socket.emit('last-ticket', ticketControl.lastTicket);

}



module.exports = {
    socketController
}

