const firstName = document.getElementById("firstName");
const userName = firstName.innerHTML;
/*
const cid = document.getElementById("cid");
const cartId = cid.innerHTML;

const productsFromHandlebars = document.getElementById("products");
const jsonProducts = productsFromHandlebars.innerHTML;
const products = JSON.parse(jsonProducts);

const table = document.getElementById("table");

let tableHTML = `
<tr class="tableRowStyle">
  <th>Nombre</th>
  <th>Descripción</th>
  <th>Código</th>
  <th>Imagen</th>
  <th>Precio</th>
  <th>Cantidad</th>
  <th></th>
</tr>
    `;

products.payload.forEach(p => {
  tableHTML += `
  <tr>
    <td>${p.title}</td>
    <td>${p.description}</td>
    <td>${p.code}</td>
    <td>${p.thumbnail}</td>
    <td>${p.price}</td>
    <form id="form-${p.id}" method="POST" action="/api/carts/${cartId}/product/${p.id}">
      <td><input type="number" name="quantity" min="1" max="${p.stock}"></td>
      <td><button type="button" class="add-to-cart" data-product-id="${p.id}">Añadir al carrito</button></td>
    </form>
  </tr>
  `;
});
    
table.innerHTML = tableHTML;
    
const addToCartButtons = document.querySelectorAll('.add-to-cart');
addToCartButtons.forEach(button => {
  button.addEventListener('click', async () => {
  const form = document.getElementById(`form-${button.dataset.productId}`);
  const formData = new FormData(form);
    try {
      const response = await fetch(form.action, {
      method: 'POST',
      body: formData,
    });
      return response
    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
  });
});
*/
Swal.fire({
    title: `Bienvenido ${userName}!`,
    showConfirmButton: false,
    timer: 2000
  });
