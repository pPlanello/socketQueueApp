const labelNewTicket = document.getElementById('labelNewTicket');
const buttonCreateTicket = document.getElementById('buttonCreateTicket');

const socket = io();

socket.on('connect', (socket) => {
    console.log('Connected');

    buttonCreateTicket.disabled = false;
});

socket.on('disconnect', () => {
    console.log('Disconnected');

    buttonCreateTicket.disabled = true;
});

socket.on('last-ticket', (lastTicket) =>{
    labelNewTicket.innerText = 'Ticket ' + lastTicket;
});

buttonCreateTicket.addEventListener('click', () => {
    socket.emit('next-ticket', null, (ticket) => {
        labelNewTicket.innerText = ticket;
    });
});