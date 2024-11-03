const socket = io();

const chatBox = document.getElementById('chat-box');
const chatInput = document.getElementById('chat-input');

socket.on('chatMessage', (msg) => {
    const messageElement = document.createElement('p');
    messageElement.textContent = msg;
    chatBox.appendChild(messageElement);
});

function sendMessage() {
    const msg = chatInput.value;
    socket.emit('chatMessage', msg);
    chatInput.value = '';
}
