import fs from 'fs'

class ProductManager{
    constructor(){
        this.path = './ProductsList.json'
    }

    async addProduct(obj) {
        try {
          const products = await this.getProducts({});
          let id;
          if (!products.length) {
            id = 1;
          } else {
            id = products[products.length - 1].id + 1;
          }
          if (typeof obj.status === 'boolean') {
            const product = { id, ...obj };
            products.push(product);
            this.#writeFileLogic(products)
            return product;
          } else {
            const product = { id, ...obj, status: true };
            products.push(product);
            this.#writeFileLogic(products)
            return product;
          }
        } catch (error) {
          return error;
        }
      }

    async getProducts(){
        try {
            if(fs.existsSync(this.path)){
                const productsList = await this.#readFileLogic();
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
            const products = await this.getProducts({})
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

    async updateProduct(id, obj) {
        try {
          const products = await this.getProducts()
          const productSearch = products.findIndex((p) => p.id === id)
          if (productSearch === -1) {
            return -1
          }
          if ('id' in obj) {
            delete obj.id; 
          }
          const product = products[productSearch]
          products[productSearch] = { ...product, ...obj }
          this.#writeFileLogic(products)
          return 1
        } catch (error) {
          return error
        }
      }

    async deleteProduct(id){
        try {
            const products = await this.getProducts()
            const product = products.find((p) => p.id === id)
            if (!product) {
              return -1
            }
            const newProductsList = products.filter((p) => p.id !== id)
            this.#writeFileLogic(newProductsList)
            return 1
        } catch (error) {
            return error
        }
    }

    async #writeFileLogic(param) {
            await fs.promises.writeFile(this.path, JSON.stringify(param))
    }

    async #readFileLogic() {
        const productsList = await fs.promises.readFile(this.path, 'utf-8');
        return productsList
    }
}

export const ProductsManager = new ProductManager('ProductsList.json')
