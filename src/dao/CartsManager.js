import { cartsModel } from "./models/carts.model.js";
import BasicManager from "./BasicManager.js";
import mongoose from 'mongoose'

class CartsManager extends BasicManager {
  constructor() {
    super(cartsModel);
  }

  async addProductToCart(cid, pid, quantity) {
    try {
      if(cid !== mongoose.Types.ObjectId){
        return -1
      }
      const cart = await this.model.findOne({ _id: cid });
      if (!cart) {
        return -1; 
      } else {
        const existingProduct = cart.products.find(product => product._id === pid);
        if (existingProduct) {
          existingProduct.quantity += quantity;
        } else {
          const product = {
            _id: pid,
            quantity: quantity
          };
          cart.products.push(product);
        }
        await cart.save();
        return cart;
      }
    } catch (error) {
      return error;
    }
  }
}

export const cartsManager = new CartsManager();
