// server.js
const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

const PORT = process.env.PORT || 3000;

app.use(express.static('public'));

io.on('connection', (socket) => {
    console.log('Un usuario se ha conectado');

    socket.on('chat message', (data) => {
        // Broadcast a todos los usuarios
        io.emit('chat message', data);
    });

    socket.on('disconnect', () => {
        console.log('Un usuario se ha desconectado');
    });
});

http.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
