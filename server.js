const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const mongoose = require('mongoose');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const db = require('./config/db');  
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

app.use(express.static('public'));

let connectedUsers = [];

io.on('connection', (socket) => {
    console.log('New user connected');

    connectedUsers.push(socket);

    socket.on('disconnect', () => {
        connectedUsers = connectedUsers.filter((user) => user !== socket);
        console.log('User disconnected');
    });

    socket.on('chatMessage', (msg) => {
        const recipient = connectedUsers.find((user) => user !== socket);
        if (recipient) {
            recipient.emit('chatMessage', msg);
        }
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
