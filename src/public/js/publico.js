const labelTicket1 = document.getElementById('labelTicket1');
const labelTicket2 = document.getElementById('labelTicket2');
const labelTicket3 = document.getElementById('labelTicket3');
const labelTicket4 = document.getElementById('labelTicket4');
const labelEscritorio1 = document.getElementById('labelEscritorio1');
const labelEscritorio2 = document.getElementById('labelEscritorio2');
const labelEscritorio3 = document.getElementById('labelEscritorio3');
const labelEscritorio4 = document.getElementById('labelEscritorio4');

const socket = io();

socket.on('last-4-tickets', (last4Tickets) => {
    
    const audio = new Audio('./audio/new-ticket.mp3');
    audio.play();

    const [ticket1, ticket2, ticket3, ticket4] = last4Tickets;

    if (ticket1) {
        labelTicket1.innerText = 'Ticket ' + ticket1.number;
        labelEscritorio1.innerText = ticket1.desktop;
    }

    if (ticket2) {
        labelTicket2.innerText = 'Ticket ' + ticket2.number;
        labelEscritorio2.innerText = ticket2.desktop;
    }
    
    if (ticket3) {
        labelTicket3.innerText = 'Ticket ' + ticket3.number;
        labelEscritorio3.innerText = ticket3.desktop;
    }
    
    if (ticket4) {
        labelTicket4.innerText = 'Ticket ' + ticket4.number;
        labelEscritorio4.innerText = ticket4.desktop;
    }
});