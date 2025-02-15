const sendButton = document.getElementById('send-button');
const messageInput = document.getElementById('message-input');
const messagesContainer = document.getElementById('messages');

function sendMessage() {
    const messageText = messageInput.value.trim();
    if (messageText) {
        const newMessage = document.createElement('div');
        newMessage.classList.add('message', 'user1');
        newMessage.textContent = messageText;
        messagesContainer.appendChild(newMessage);

        messagesContainer.scrollTop = messagesContainer.scrollHeight;
        messageInput.value = '';

        messageInput.style.height = '50px'; 
        messageInput.style.height = 'auto';
        messageInput.style.height = (messageInput.scrollHeight) + 'px'; 
    }
}

sendButton.addEventListener('click', sendMessage);

messageInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        sendMessage();
    }
});

messageInput.addEventListener('input', () => {
    messageInput.style.height = 'auto'; // Reset height to allow for resizing
    messageInput.style.height = (messageInput.scrollHeight) + 'px'; // Adjust height dynamically
});
