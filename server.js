const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*", // Adjust this to allow specific origins in production
        methods: ["GET", "POST"]
    }
});

app.use(express.static('public'));

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('chatMessage', (msg) => {
        io.emit('chatMessage', msg);
    });
});

server.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
