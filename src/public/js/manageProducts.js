document.getElementById('deleteForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const pid = document.getElementById('pid').value;

    fetch(`http://localhost:8080/api/products/${pid}`, {
        method: 'DELETE',
    })
    try {
        response => {
            console.log(response)
            return Swal.fire({
                title: response,
                timer: 2000
              });
        }
    } catch (error) {
            console.error(error.message)
            return Swal.fire({
                title: error,
                timer: 2000
              });
        }
    })
    