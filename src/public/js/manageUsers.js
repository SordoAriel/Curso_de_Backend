document.getElementById('deleteOneForm').addEventListener('submit', function (e) {
    e.preventDefault();
    
    const email = this.dataset.email;
    

    fetch(`http://localhost:8080/api/users/${email}`, {
        method: 'DELETE',
    })
    .then(res => {
        if (res.ok) {
            return res.json(); 
        } else {
            throw new Error('Error al intentar eliminar el usuario');
        }
    })
    .catch(error => {
        return error.message
    });
    
});

document.getElementById('cleanInactiveBtn').addEventListener('click', function (e) {
    e.preventDefault();

    fetch(`http://localhost:8080/api/users`, {
        method: 'DELETE',
    })
    .then(res => {
        console.log('res', res)
        if (res.ok) {
            return res.json(); 
        } else {
            throw new Error('Error al intentar eliminar los usuarios inactivos');
        }
    })
    .catch(error => {
        return error.message
    });
})

