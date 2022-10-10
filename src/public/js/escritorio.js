const desktopHeader = document.getElementById('desktopHeader');
const labelLastTicket = document.getElementById('labelLastTicket');
const labelLast4Tickets = document.getElementById('labelLast4Tickets');
const buttonAttendNextTicket = document.getElementById('buttonAttendNextTicket');
const labelAlertInfo = document.getElementById('labelAlertInfo');

const socket = io();


const searchParams = new URLSearchParams( window.location.search );
labelAlertInfo.style.display = 'none';

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

buttonAttendNextTicket.addEventListener('click', () => {
    socket.emit('attend-ticket', desktop, (response) => {
        console.log(response);
        const {ok, msg, ticket} = response;
        
        if (!ok) {
            labelLastTicket.innerText = 'No tickets';
            labelAlertInfo.style.display = '';
        }

        labelLastTicket.innerText = 'Ticket ' + ticket.number;
    });
});