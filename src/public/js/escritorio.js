const desktopHeader = document.getElementById('desktopHeader');
const labelLastTicket = document.getElementById('labelLastTicket');
const labelLast4Tickets = document.getElementById('labelLast4Tickets');
const buttonAttendNextTicket = document.getElementById('buttonAttendNextTicket');

const socket = io();


const searchParams = new URLSearchParams( window.location.search );

if (!searchParams.has('escritorio')) {
    window.location = 'index.html';
    throw new Error('The desktop is mandatory');
}

const desktop = searchParams.get('escritorio');
desktopHeader.innerText = 'Escritorio: ' + desktop;

socket.on('connect', (socket) => {
    console.log('Connected');
    buttonAttendNextTicket.disabled = false;
});

socket.on('disconnect', () => {
    console.log('Disconnected');
    buttonAttendNextTicket.disabled = true;
});

socket.on('last-ticket', (lastTicket) =>{
    labelLastTicket.innerText = 'Ticket ' + lastTicket;
});

buttonAttendNextTicket.addEventListener('click', () => {
    socket.emit('attend-ticket', null, (ticket) => {
        console.log(ticket);
        labelNewTicket.innerText = ticket;
    });
});

console.log('Escritorio HTML', desktop);