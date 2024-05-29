const ws = new WebSocket(`ws://${window.location.host}`);
const messages = document.getElementById("messages");
const messageInput = document.getElementById("messageInput");
const sendButton = document.getElementById("sendButton");

ws.onopen = () => {
  console.log("Connected to the server");
};

ws.onmessage = event => {
  const reader = new FileReader();
  reader.onload = () => {
    // console.log("Received message:", reader.result);
    const message = document.createElement("div");
    message.textContent = reader.result;
    messages.appendChild(message);
  };
  reader.readAsText(event.data);
};

ws.onerror = error => {
  console.error("WebSocket error:", error);
};

ws.onclose = () => {
  console.log("Disconnected from the server");
};

sendButton.onclick = () => {
  const message = messageInput.value;
  if (message.trim() !== "") {
    ws.send(message);
    messageInput.value = "";
  }
};