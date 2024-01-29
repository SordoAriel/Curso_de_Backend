

document.getElementById('deleteForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const pid = document.getElementById('pid').value;

    fetch(`http://localhost:8080/api/products/${pid}`, {
        method: 'DELETE',
    })
    .then(res => {
        console.log('res', res)
        if (res.ok) {
            return res.json(); 
        } else {
            throw new Error('No fue posible encontrar el producto');
        }
    })
    .then(data => {
        console.log('data',data)
        if( data.message === "Producto eliminado"){
            return Swal.fire({
                title: data.message,
                timer: 2000
            });
        }
    })
    .catch(error => {
        return Swal.fire({
            title: error.message,
            timer: 2000
        });
    })
});
