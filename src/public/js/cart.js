const cid = document.getElementById("cid");
const cidValue = cid.innerHTML;
console.log(cidValue)

async function getProducts(cidValue) {
    const products = await `http://localhost:8080/carts/${cidValue}`
    console.log(products)
} 

getProducts();
