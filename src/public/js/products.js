//import { cartsManager } from '../../dao/DB/Managers/CartsManager.js';
//const { cartsManager } = require('../../dao/DB/Managers/CartsManager.js');

const addToCartBtns = document.querySelectorAll(".addToCartBtn");

addToCartBtns.forEach((button) => {
    button.onClick( async (e) => {
        e.preventDefault();
        const productRow = button.closest("tr");
        const productId = productRow.id.replace("productRow", "");
        console.log('Hola')
        const result = await cartsManager.addProductToCart("65298a9e029ea332d3080333", productId, 30);
        alert("Producto agregado", result)
    });
});


/*
const addToCartBtn = document.getElementById("addToCartBtn")

const {_id} = document.getElementById(`"productRow${_id}`)
console.log(productId)

addToCartBtn.onclick = async (e) => {
    e.preventDefault()
    const addProductToCart = await cartsManager.addProductToCart("65298a9e029ea332d3080333", "65282adbcb45fea94a80c137", 30)
    return addProductToCart
    //const productToAdd = ${}
}
*/

