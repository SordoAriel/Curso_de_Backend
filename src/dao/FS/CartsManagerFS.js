import fs from 'fs'

class CartManager{
    constructor(){
        this.path = './carts.json'
    }

    async getCarts(){
        try {
            if(fs.existsSync(this.path)){
              const cartsList = await this.#readFileLogic();
                if(cartsList === ''){
                    return []
                } else {
                return JSON.parse(cartsList)
                }
            } else {
                return []
            }
        } catch (error) {
            return error
        }
    }

    async newCart() {
        try {
          const carts = await this.getCarts({});
          let id;
          if (!carts.length) {
            id = 1;
          } else {
            id = carts[carts.length - 1].id + 1;
          }
          const cart = { id, products: [] }; 
          carts.push(cart);
          this.#writeFileLogic(carts)
          return cart; 
        } catch (error) {
          return error;
        }
      }
      
      async addToCart(id, obj) {
        try {
          const carts = await this.getCarts();
          const cartIndex = carts.findIndex((c) => c.id === +id);
          if (cartIndex === -1) {
            return -1; 
          }
          const cart = carts[cartIndex];
          const existingProductIndex = cart.products.findIndex((p) => p.pid === obj.pid);
          if (existingProductIndex !== -1) {
            cart.products[existingProductIndex].quantity += obj.quantity;
          } else {
            cart.products.push(obj);
          }
          this.#writeFileLogic(carts)
          return cart;
        } catch (error) {
          return error;
        }
      }

    async getCartById(id){
        try {
            const cartsId = await this.getCarts({})
            console.log(cartsId)
            const cart = cartsId.find( c => c.id === id)
            if(cart){
                return cart
            } else {
                return 'Not Found'
            }
        } catch (error) {
            return error
        }
    }

    async #writeFileLogic(param) {
      await fs.promises.writeFile(this.path, JSON.stringify(param))
    }

    async #readFileLogic() {
      const cartsList = await fs.promises.readFile(this.path, 'utf-8');
      return cartsList
    }
}

export const CartsManager = new CartManager('carts.json')
