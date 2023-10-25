const firstName = document.getElementById("firstName");
console.log(firstName)
const userName = firstName.innerHTML;

console.log(userName)

Swal.fire({
    title: `Bienvenido ${userName}!`,
    showConfirmButton: false,
    timer: 2000
  });
