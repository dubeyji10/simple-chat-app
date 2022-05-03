const useClass = ['message-recived' , 'message-sent' ];
const socket = io('http://localhost:3000');
const messageContainer = document.getElementById('message-container')
const messageForm = document.getElementById('send-container')
const messageInput = document.getElementById('message-input')

console.log("socket in use ->" , socket.id);


const name = prompt('What is your name?')
appendMessage('You joined')
socket.emit('new-user', name)


socket.on('chat-message', data => {
  // append messages from this function call  
  // appendMessage(`${data.name}  ${data.message}`)

  appendMessage2(data.name , data.message );

})

socket.on('user-connected', name => {
  appendMessage(`${name} connected`)
})

socket.on('user-disconnected', name => {
  appendMessage(`${name} disconnected`)
})

messageForm.addEventListener('submit', e => {
  e.preventDefault()
  const message = messageInput.value
  // appendMessage(`You: ${message}`)
  appendMessageWithClass(message , useClass[0]);

  socket.emit('send-chat-message', message)
  messageInput.value = ''
  messageContainer.scrollTop = messageContainer.scrollHeight;
})

function appendMessage(message) {
  const messageElement = document.createElement('div');
  console.log("applying class to message sent .... ",useClass[0]);
  // messageElement.className = useClass[0];
  messageElement.innerHTML = "<div class=message-recieved>"+ message+ " </div>";
  messageContainer.appendChild(messageElement)
}

function appendMessage2(userName , message) {
  const messageElement = document.createElement('div');
  console.log("applying class to message sent .... ",useClass[0]);
  // messageElement.className = useClass[0];
  messageElement.innerHTML = "<div class=message-recieved>"+ "(" +userName +")"+ message+ " </div>";
  messageContainer.appendChild(messageElement)
}

function appendMessageWithClass(message,class_Name) {
  const messageElement = document.createElement('div');
  console.log("applying class to message sent .... ",class_Name);
  messageElement.className = useClass[1];
  messageElement.textContent =  message+" (you)";
  messageContainer.appendChild(messageElement);
}