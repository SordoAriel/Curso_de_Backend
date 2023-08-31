class ProductManager{
    constructor(){
        this.products=  [];
    }

    addProduct(title, description, price, thumbnail, code, stock){

        if (title && description && price && thumbnail && code && stock){
            if (this.products.some(product => product.code === code)) {
                return ("Articulo ya existente")
            } else {
                const product = {
                    id: this.products.length > 0
                    ? this.products[this.products.length-1].id+1
                    : 1,
                    title,
                    description,
                    price,
                    thumbnail,
                    code,
                    stock,
                }
                this.products.push(product)
            }
        } else { 
            return ("Ops! Parece que faltan llenar algunos campos")
        }
    }

    getProducts(){
        return this.products
    }

    getProductById(id){
        const productSearched = this.products.find(product => product.id === id)
        if(!productSearched){
            return ("Not found")
        } else {
            return productSearched
        }
    }
}

//Pruebas

let product = new ProductManager();
console.log(product.getProducts());

product.addProduct("producto prueba", "Este es un producto prueba", 200, "Sin imagen", "abc123", 25);
console.log(product.getProducts());

console.log(product.addProduct("", "Este es un producto prueba", 200, "Sin imagen", "abc124", 25));
console.log(product.addProduct("producto prueba", "Este es un producto prueba", 200, "Sin imagen", "abc123", 25));

product.addProduct("producto prueba2", "Este es un producto prueba2", 200, "Sin imagen", "abc124", 25);
console.log(product.getProducts());

console.log(product.getProductById(2));
console.log(product.getProductById(8));
