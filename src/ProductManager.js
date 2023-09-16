import fs from 'fs'

class ProductManager{
    constructor(){
        this.path = './ProductsList.json'
    }

    async addProduct(title, description, price, thumbnail, code, stock){
        try {
            const products = await this.getProducts()
             if (title || description || price || thumbnail || code || stock){
                if (products.some(product => product.code === code)) {
                    return ("Articulo ya existente")
                } else {
                    const product = {
                        id: products.length > 0
                        ? products[products.length-1].id+1
                        : 1,
                        title,
                        description,
                        price,
                        thumbnail,
                        code,
                        stock,
                    }
                    products.push(product)
                    await fs.promises.writeFile(this.path,JSON.stringify(products))
                }
            } else { 
                return ("Ops! Parece que faltan llenar algunos campos")
            }            
        } catch (error) {
            return error
        }
    }

    async getProducts(){
        try {
            if(fs.existsSync(this.path)){
                const productsList = await fs.promises.readFile(this.path,'utf-8')
                if(productsList === ''){
                    return []
                } else {
                return JSON.parse(productsList)
                }
            } else {
                return []
            }
        } catch (error) {
            return error
        }
    }

    async getProductById(id){
        try {
            const products = await this.getProducts()
            const product = products.find( product => product.id === id)
            if(product){
                return product
            } else {
                return 'Not Found'
            }
        } catch (error) {
            return error
        }

    }

    async updateProducts(id, key, newValue){
        try {
            const products = await this.getProducts()
            const product = await this.getProductById(id)
            const productToModify = {...product}
            if(key !== 'id') {productToModify[key] = newValue};
            const index = products.findIndex((p) => p.id === id);
            if (index !== -1) {
                products[index] = productToModify;
            } 
            await fs.promises.writeFile(this.path,JSON.stringify(products))
            return productToModify
        } catch (error) {
            return error
        }        
    }

    async deleteProduct(id){
        try {
            const products = await this.getProducts()
            const newProductsList = products.filter(product => product.id !== id)
            await fs.promises.writeFile(this.path,JSON.stringify(newProductsList))
        } catch (error) {
            return error
        }
    }
}

export const ProductsManager = new ProductManager('ProductList.json')

async function test(){
    const product = new ProductManager()
    await product.addProduct("producto prueba", "Este es un producto prueba", 200, "Sin imagen", "abc123", 25);
    await product.addProduct("", "Este es un producto prueba", 200, "Sin imagen", "abc124", 25)
    await product.addProduct("producto prueba", "Este es un producto prueba", 200, "Sin imagen", "abc123", 25)
    await product.addProduct("producto prueba2", "Este es un producto prueba2", 200, "Sin imagen", "abc124", 25)
    await product.deleteProduct(1)
    const productSearched = await product.getProductById(2)
    await product.updateProducts(2, 'id', '8')
    await product.updateProducts(2, 'description', 'cambio de prueba de descripción')
    const products = await product.getProducts()
    console.log(products)
    console.log(productSearched);
}
//test()
