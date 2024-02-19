const cid = document.getElementById('cid').textContent

document.querySelectorAll('#changeQuantityForm').forEach(form => {
    form.addEventListener('submit', function (e) {
        e.preventDefault();
    
    const pid = this.dataset.pid;
    const quantityInput = this.elements["quantity"]; 
        const quantity = quantityInput.value; 
    console.log(quantity)
    
    fetch(`/api/carts/${cid}/product/${pid}`, {
        method: 'PUT',
        body: JSON.stringify({quantity: quantity}), 
        headers: { 'Content-Type': 'application/json' }
    })
    .then(res => {
        if (res.ok) {
            return res.json(); 
        } else {
            throw new Error('No fue posible modificar la cantidad del producto');
        }
    })
    .catch(error => {
        return error.message
    })
})
});

document.querySelectorAll('#deleteProductForm').forEach(form => {
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        
        const pid = this.dataset.pid;
        
        fetch(`/api/carts/${cid}/product/${pid}`, {
            method: 'DELETE',
        })
        .then(res => {
            if (res.ok) {
                return res.json(); 
            } else {
                throw new Error('No fue posible eliminar el producto');
            }
        })
        .catch(error => {
            return error.message;
        });
    });
});

document.querySelector('#deleteAllProductsForm').addEventListener('submit', function (e) {
    e.preventDefault();

    fetch(`/api/carts/${cid}`, {
        method: 'DELETE'
    })
    .then(res => {
        if (res.ok) {
            return res.json(); 
        } else {
            throw new Error('No fue posible vaciar el carrito');
        }
    })
    .catch(error => {
        return error.message;
    });
})
