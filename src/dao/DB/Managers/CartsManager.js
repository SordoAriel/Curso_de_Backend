import { cartsModel } from "../models/carts.model.js";
import { productsManager } from "./ProductsManager.js"
import BasicManager from "./BasicManager.js";
import mongoose from 'mongoose';

class CartsManager extends BasicManager {
  constructor() {
    super(cartsModel, "products.product");
  }
  
  async addProductToCart(cid, pid, quantity=1) {
    try {
      const cart = await this.model.findOne({ _id: cid });
      if (!cart) {
        return -1; 
      } else {
        const existingProduct = cart.products.find(p => p.product.toString() === pid);
        console.log(quantity)
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
    console.log('cart', cart)
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
  
  async endPurchase(cid){
    try {
    const purchase = await this.model.findOne({ _id: cid }).populate("products.product");
    const enoughStockProducts = purchase.products.filter(p => p.quantity <= p.product.stock)
    if(!enoughStockProducts.length){
      return -1
    }    
    const notEnoughStockProducts = purchase.products.filter(p => p.quantity > p.product.stock)    
    const prices = enoughStockProducts.map(p => p.product.price * p.quantity)
    const total = prices.reduce((a, e) => a + e, 0)
    const response = {total, notEnoughStockProducts}
    const updateStock = await productsManager.updateStock(enoughStockProducts)
    if(updateStock === 1){
      await this.model.updateOne(
        { _id: cid },
        {
          $pull: {
            products: { product: { $in: enoughStockProducts.map(p => p.product._id) } }
          }
        }
      );
    }
    return response
    } catch (error) {
      return error 
    }
  }
}

export const cartsManager = new CartsManager();
