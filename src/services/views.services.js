import { ProductsManager } from '../dao/FS/ProductManagerFS.js';
import { productsManager } from '../dao/DB/Managers/ProductsManager.js'
import { cartsManager } from '../dao/DB/Managers/CartsManager.js'

export const getProducts = async (obj) => {
    const products = await ProductsManager.getProducts(obj);
    return products
}

export const getWithAdvancedSearch = async (obj) => {
    const searchProducts = await productsManager.getWithAdvancedSearch(obj);
    return searchProducts
}

export const  getByIdAndPopulate = async (cid) => {
    const displayCurrentCart = await cartsManager.get(cid);
    return displayCurrentCart
}