const socketClient = io()

const addProductForm = document.getElementById("addProductForm");
const inputTitle = document.getElementById("addProductTitle");
const inputDescription = document.getElementById("addProductDescription");
const inputStock = document.getElementById("addProductStock")
const inputPrice = document.getElementById("addProductPrice");
const inputThumbnail = document.getElementById("addProductThumbnail")
const inputCode = document.getElementById("addProductCode")

const catalogueTable = document.getElementById("catalogueTable");
const productsTable = document.getElementById("productsTable");

addProductForm.onsubmit = (e)=>{
  e.preventDefault()
  const product = {
    title: inputTitle.value,
    description: inputDescription.value,
    stock: inputStock.value,
    price: inputPrice.value,
    thumbnail: inputThumbnail.value,
    code: inputCode.value
  };
  socketClient.emit('addProduct', product)
}

socketClient.on('newProduct', (product) => {
  const {id, title, description, stock, price, thumbnail, code} = product
  const row =`
  <tr class="tableRowStyle">
    <td>${id}</td>
    <td>${title}</td>
    <td>${description}</td>
    <td>${code}</td>
    <td>${stock}</td>
    <td>${thumbnail}</td>
    <td>${price}</td>
  </tr>
  ` 
  catalogueTable.innerHTML += row
})

const deleteProductForm = document.getElementById("deleteProductForm")
const inputId = document.getElementById("deleteId")

deleteProductForm.onsubmit = (e) => {
  e.preventDefault()
  const id = inputId.value
  socketClient.emit('deleteProduct', id)
}

socketClient.on('deletedProduct', (id) => {
  const productRow = document.getElementById(`productRow_${id}`);
  console.log(productRow)
  if (productRow) {
    productRow.remove();
  }
});
