const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const connectDB = require('./config/db'); 

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

connectDB();

app.use(express.static('public'));

io.on('connection', (socket) => {
    console.log('New user connected');
    
    socket.on('chatMessage', (msg) => {
        socket.broadcast.emit('chatMessage', msg); 
    });
    
    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
