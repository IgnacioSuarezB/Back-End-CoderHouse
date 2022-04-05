const socket = io.connect();
socket.on("messages", (data) => console.log(data));

const $form = document.querySelector("#noteForm");
const $email = document.querySelector("#email");
const $message = document.querySelector("#message");
const $chat = document.querySelector("#chat");

$form.addEventListener("submit", (e) => {
  e.preventDefault();
  socket.emit("client:chatMessage", {
    email: $email.value,
    message: $message.value,
  });
});

socket.on("server:newMessage", (newMessage) => {
  console.log(newMessage);
  $chat.innerHTML += `
      <div class="rounded-0 mb-2">
      <div >
      <span class="text-primary"> ${newMessage.email} </span><span class="text-danger">[${newMessage.timeStamp}]: </span>
      <span class="text-success">${newMessage.message}</span>
      </div>
  </div>
  `;
});

socket.on("server:loadMessages", (allMessages) => {
  allMessages.forEach((message) => {
    $chat.innerHTML += `
      <div class="rounded-0 mb-2">
      <div >
      <span class="text-primary"> ${message.email} </span><span class="text-danger">[${message.timeStamp}]: </span>
      <span class="text-success">${message.message}</span>
      </div>
  </div>
  `;
  });
});
