const path = require('path');
const fs = require('fs');
const Ticket = require('./ticket');

class TicketControl {

    constructor() {
        this.lastTicket = 0;
        this.todayDate = new Date().toLocaleDateString();
        this.tickets = [];
        this.last4Tickets = [];

        this.init();
    }

    get toJson() {
        return {
            lastTicket: this.lastTicket,
            todayDate: this.todayDate,
            tickets: this.tickets,
            last4Tickets: this.last4Tickets
        }
    }

    init() {
        const {lastTicket, todayDate, tickets, last4Tickets} = require('../db/data.json');
        
        if (todayDate === this.todayDate) {
            // Load data
            this.lastTicket = lastTicket;
            this.todayDate = todayDate;
            this.tickets = tickets;
            this.last4Tickets = last4Tickets;
        } else {
            // Start with new data
            this.saveDB();
        }
    }

    saveDB() {
        const dbPath = path.join(__dirname, '../db/data.json');
        fs.writeFileSync(dbPath, JSON.stringify(this.toJson));
    }

    nextTicket() {
        this.lastTicket += 1;

        const ticket = new Ticket(this.lastTicket, null);
        this.tickets.push(ticket);
        
        this.saveDB();
        return 'Ticket: ' + ticket.number;
    }

    attendTicket(desktop) {
        if (this.tickets.length === 0) {
            return null;
        }

        // take ticket and delete in list
        const ticket = this.tickets.shift();
        ticket.desktop = desktop;

        this.last4Tickets.unshift(ticket);
        
        if (this.last4Tickets.length > 4) {
            this.last4Tickets.splice(-1, 1);
        }

        this.saveDB();

        return ticket;
    }

}

module.exports = TicketControl;