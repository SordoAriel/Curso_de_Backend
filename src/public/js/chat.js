const socketClient = io();

const form = document.getElementById("userForm");
const inputMessage = document.getElementById("userMessage");
const userName = document.getElementById("user");
const divChat = document.getElementById("chat");

let user;

Swal.fire({
  title: "Bienvenido",
  text: "Por favor, ingrese su nombre",
  input: "text",
  inputValidator: (value) => {
    if (!value) {
      return "Name is required";
    }
  },
  confirmButtonText: "Enter",
}).then((input) => {
  user = input.value;
  userName.innerText = `Usuario: ${user}`;
  socketClient.emit("newUser", user);
});

socketClient.on("newUserBroadcast", (user) => {
  Toastify({
    text: `${user} connected`,
    duration: 5000,
    style: {
      background: "linear-gradient(to right, #00b09b, #96c93d)",
    },
  }).showToast();
});

form.onsubmit = (e) => {
  e.preventDefault();
  const infoMessage = {
    user: user,
    message: inputMessage.value,
  };
  socketClient.emit("message", infoMessage);
};

socketClient.on("chat", (messages) => {
  const chat = messages
    .map((objMessage) => `<p>${objMessage.user}: ${objMessage.message}</p>`)
    .join(" ");
  divChat.innerHTML = chat;
});
