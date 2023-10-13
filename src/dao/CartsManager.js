import { cartsModel } from "./models/carts.model.js";
import BasicManager from "./BasicManager.js";
import mongoose from 'mongoose'

class CartsManager extends BasicManager {
  constructor() {
    super(cartsModel);
  }

  async addProductToCart(cid, pid, quantity) {
    try {
      const cartId = mongoose.Types.ObjectId(cid); 
      const cart = await this.model.findOne({ _id: cartId });
      if (!cart) {
        console.log('no cart')
        return -1;
      } else {
        const product = {
          _id: pid,
          quantity: quantity
        };
  
        cart.products.push(product);
  
        try {
          console.log('Antes de guardar el carrito');
          const savedCart = await cart.save();
          console.log('Después de guardar el carrito');
          console.log('savedCart:', savedCart);
          return product;
        } catch (error) {
          console.error('Error al guardar el carrito:', error);
          return error;
        }
      }
    } catch (error) {
      return error;
    }
  }
}
            //return product
      /*
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
      return cart;*/

export const cartsManager = new CartsManager();
