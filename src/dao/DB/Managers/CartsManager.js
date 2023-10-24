import { cartsModel } from "../models/carts.model.js";
import BasicManager from "./BasicManager.js";
import mongoose from 'mongoose'

class CartsManager extends BasicManager {
  constructor() {
    super(cartsModel);
  }

  async getByIdAndPopulate(cid){
    try {
      const products = await this.model.find({ _id: cid }).populate("products.product", ["title", "description", "price", "stock", "category"]);
      return products
    } catch (error) {
      return error
    }
    
  }

  async addProductToCart(cid, pid, quantity=1) {
    try {
      if (!mongoose.Types.ObjectId.isValid(cid)) {
        return -1;
      }
      const cart = await this.model.findOne({ _id: cid });
      if (!cart) {
        return -1; 
      } else {
        const existingProduct = cart.products.find(p => p.product.toString() === pid);
        if (existingProduct) {
          existingProduct.quantity += quantity;
        } else {
          const product = {
            product: pid,
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

  async updateProductFromCart(cid, obj){
    if (!mongoose.Types.ObjectId.isValid(cid)) {
      return -1;
    }
    const cart = await this.model.findOne({ _id: cid });
    if (!cart) {
      return -1; 
    }
    try {
      cart.products = [];
      cart.products.push(...obj)
      await cart.save();
      return cart
    } catch (error) {
      return error
    }
  }

  async updateQuantity(cid, pid, quantity){
    if (!mongoose.Types.ObjectId.isValid(cid)) {
      return -1;
    }
    const cart = await this.model.findOne({ _id: cid });
    if (!cart) {
      return -1; 
    }
    try {
      if (!mongoose.Types.ObjectId.isValid(pid)) {
        return -1;
      }
      const productToUpdate = await cart.products.find((p) => p._id === pid)
      if (!productToUpdate) {
        return -1; 
      }
      productToUpdate.quantity = quantity
      await cart.save();
      return cart
    } catch (error) {
      return error
    }
  }

  async delProductFromCart(cid, pid){
    if (!mongoose.Types.ObjectId.isValid(cid)) {
      return -1;
    }
    try {
      const cart = await this.model.findByIdAndUpdate(cid, { $pull: { products: { _id: pid } } });
      if (!cart) {
        return -1; 
      }
      return cart
    } catch (error) {
      return error
    }

  }

  async delAllProductsFromCart(cid){
    try {
      const cart = await this.model.updateOne(
        { _id: cid },
        { products: [] } )
      return cart  
    } catch (error) {
      return error
    }
  }  
}

export const cartsManager = new CartsManager();
