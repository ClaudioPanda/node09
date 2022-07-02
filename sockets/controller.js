const TicketControl = require('../models/ticket_control.js');

const ticketControl = new TicketControl();

const socketController = (socket) => {

    socket.emit('ultimo-ticket', ticketControl.ultimo);


    socket.on('siguiente-ticket', (payload, callback) => {


        const siguiente = ticketControl.siguiente();
        callback(siguiente);

        // TODO: Notificar que hay un nuevo ticket pendiente

        /*         
        const id = 123456789;
        callback( id );

        socket.broadcast.emit('enviar-mensaje', payload ); */

    })

    socket.on('atender-ticket', ({ escritorio }, callback) => {
        if (!escritorio) {
            return callback({
                ok: false,
                msg: 'El escritorio es obligatorio'
            });

        };

        const ticket = ticketControl.atenderTicket(escritorio);

        //    
        socket.broadcast.emit('estado-actual', ticketControl.ultimos4);

        if (!ticket) {
            callback({
                ok: false,
                msg: 'No hay tickets'
            });
        } else {
            callback({
                ok: true,
                ticket
            });
        }

    });

};

module.exports = {
    socketController
}