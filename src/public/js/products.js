const firstName = document.getElementById("firstName");
const userName = firstName.innerHTML;

Swal.fire({
    title: `Bienvenido ${userName}!`,
    showConfirmButton: false,
    timer: 2000
  });
