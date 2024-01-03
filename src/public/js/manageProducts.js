document.getElementById('deleteForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const pid = document.getElementById('pid').value;
    console.log(pid)

    fetch(`http://localhost:8080/api/products/${pid}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(response => {
        console.log(response);
    })
    .catch(error => {
        console.error(error);
    });
});