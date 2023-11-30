import { cartsManager } from "../dao/DB/Managers/CartsManager.js";
import mongoose from "mongoose";

export const getById = async (id) => {
    const cart = await cartsManager.getById(id);
    return cart
}

export const newCart = async (obj) => {
    const cart = await cartsManager.add(obj);
    return cart
}

export const addProductToCart =async (cid, pid, quantity) => {
    if (!mongoose.Types.ObjectId.isValid(cid)) {
        return -1;
      }
    const addedProduct = cartsManager.addProductToCart(cid, pid, quantity);
    return addedProduct
}

export const updateCart = async (id, obj) => {
    const updatedCart = await cartsManager.update(id, obj);
    return updatedCart
}

export const updateProductFromCart = (cid, obj) => {
    console.log('obj', obj)
    const updatedProduct = cartsManager.updateProductFromCart(cid, obj);
    return updatedProduct
}

export const updateQuantity = async (cid, pid, quantity) => {
    const updatedQuantity = cartsManager.updateQuantity(cid, pid, quantity);
    return updatedQuantity
}

export const deleteCart = async (id) => {
    const deletedCart = await cartsManager.delete(id);
    return deletedCart
}

export const deleteOneProductFromCart = async (cid, pid) => {
    const deletedProduct = cartsManager.deleteOneProductFromCart(cid, pid);
    return deletedProduct
}

export const cleanCart = async (pid) => {
    const cleanedCart = cartsManager.delAllProductsFromCart(pid);
    return cleanedCart
}
