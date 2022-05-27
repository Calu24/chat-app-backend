const { connectedUser, disconnectedUser, saveMessage } = require('../controllers/socket');
const { testJWT } = require('../helpers/jwt');
const { io } = require('../index');


// Mensajes de Sockets
io.on('connection', client => {
    console.log('Cliente conectado');
    
    const [tested, uid] = testJWT(client.handshake.headers['x-token']);
    
    
    if (!tested) {
        return client.disconnect();
    }    

    connectedUser(uid);

    //Conectar al usuario a una sala específica
    
    client.join(uid);

    //Escuchar del cliente el msj personal
    client.on('message-personal', async (payload)=> {
        // console.log(payload);

        await saveMessage(payload);

        io.to(payload.to).emit('message-personal', payload);
    })


    
    // console.log(tested, uid);

    client.on('disconnect', () => {
        console.log('Cliente desconectado');
        disconnectedUser(uid);
    });


    // client.on('mensaje', ( payload ) => {
    //     console.log('Mensaje', payload);

    //     io.emit( 'mensaje', { admin: 'Nuevo mensaje' } );

    // });


});
