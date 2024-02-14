import { productsManager } from "../dao/DB/Managers/ProductsManager.js";
import { transporter } from "../utils/nodemailer.js";

export const getAll = async (queries) => {
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

export const deleteOne = async (pid, currentUser) => {
    try {
        if(currentUser.role === 'premium'){
            const productToDelete = await productsManager.getById(pid);
            if(!productToDelete){
                return -1
            }
            if(productToDelete.owner !== currentUser.email){
                return -1
            } else {
                const deletedProduct = await productsManager.delete(pid);
                if(productToDelete.owner !== "admin"){
                    const eliminatedProductMail = {
                        from: "a.a.sordo@gmail.com",
                        to: productToDelete.owner,
                        subject: "Aviso de producto eliminado",
                        html:   `<h1>Producto eliminado de nuestra página de compras</h1>
                                <p>Estimado usuario:</p>
                                <p>Nos hemos visto en la necesidad de eliminar el siguiente producto de tu propiedad:</p>
                                <p>Nombre: ${productToDelete.title}</p>
                                <p>Descripción: ${productToDelete.description}</p> 
                                <p>Código: ${productToDelete.code}</p>
                                <p>Esto puede deberse a que no cumplía con nuestra política de Publicaciones,
                                o a que pasó más de 90 días sin recibir visitas ni actualizaciones.</p>
                                <p>Para más información, visita nuestros Términos y condiciones</p> 
                                <p>Saludos cordiales</p>
                                <p>Equipo de Ferretería Ferros</p>
                            `
                    }
                    await transporter.sendMail(eliminatedProductMail)
                }
                return deletedProduct
            }
        }
        if(currentUser.role === 'admin'){
            const productToDelete = await productsManager.getById(pid);
            if(!productToDelete){
                return -1
            } else {
                const deletedProduct = await productsManager.delete(pid);
                if(productToDelete.owner !== "admin"){
                    const eliminatedProductMail = {
                        from: "a.a.sordo@gmail.com",
                        to: productToDelete.owner,
                        subject: "Aviso de producto eliminado",
                        html:   `<h1>Producto eliminado de nuestra página de compras</h1>
                                <p>Estimado usuario:</p>
                                <p>Nos hemos visto en la necesidad de eliminar el siguiente producto de tu propiedad:</p>
                                <p>Nombre: ${productToDelete.title}</p>
                                <p>Descripción: ${productToDelete.description}</p> 
                                <p>Código: ${productToDelete.code}</p>
                                <p>Esto puede deberse a que no cumplía con nuestra política de Publicaciones,
                                o a que pasó más de 90 días sin recibir visitas ni actualizaciones.</p>
                                <p>Para más información, visita nuestros Términos y condiciones</p> 
                            `
                    }
                    await transporter.sendMail(eliminatedProductMail)
                }
                return deletedProduct
            }
        }
    } catch (error) {
        return -1
    }
    
    
}
