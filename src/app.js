const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, { cors: { origin: '*' } });

let userCount = 0;

io.on('connection', (socket) => {
    userCount++;
    io.emit('userCount', userCount);

    socket.on('disconnect', () => {
        
        userCount--;
        io.emit('userCount', userCount);
        
    });
});

const PORT = 4000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
