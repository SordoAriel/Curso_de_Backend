import { productsManager } from "../dao/DB/Managers/ProductsManager.js";

export const get = async (queries) => {
    const products = await productsManager.getWithAdvancedSearch(queries);
    return products
};

export const getById = async (pid) => {
    const product = await productsManager.getById(pid);
    return product
};

export const create = async (obj) => {
    const newProduct = await productsManager.add(obj);
    return newProduct
};

export const update = async (pid, obj) => {
    const updatedProduct = await productsManager.update(pid, obj);
    return updatedProduct
};

export const deleteOne = async (pid, currentUserRole, currentUserMail) => {
    if(currentUserRole === "premium"){
        const productToDelete = await productsManager.getById(pid);
        if(productToDelete.owner !== currentUserMail){
            return -1
        }
    }
    const deletedProduct = await productsManager.delete(pid);
    return deletedProduct
}
