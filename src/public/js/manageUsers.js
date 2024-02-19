document.querySelectorAll('#deleteOneForm').forEach(form => {
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        
        const email = this.dataset.email;
        console.log(email)
        console.log('entra al formulario')

        fetch(`/api/users/${email}`, {
            method: 'DELETE',
        })
        .then(res => {
            console.log('Petición correcta')
            if (res.ok) {
                return res.json(); 
            } else {
                throw new Error('Error al intentar eliminar el usuario');
            }
        })
        .catch(error => {
            console.log('Petición incorrecta')
            return error.message
        });
    })
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
