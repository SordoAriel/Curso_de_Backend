import { getAll, getById, create, update, deleteOne } from "../services/products.services.js";
import { ProductsManager } from '../dao/FS/ProductManagerFS.js';
import CustomizedError from "../errors/customized.errors.js";
import { errorMessages } from "../errors/errors.enum.js";

export const getAllProducts = async (req,res)=>{
    try {
        const products = await getAll(req.query);
        if (!products) {
          CustomizedError.currentError(errorMessages.CANT_FIND_PRODUCT)
        }
        res.status(200).json({ message: 'Productos encontrados:', products: products });
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    }    

export const getProductById = async (req,res)=>{
    const {pid} = req.params
      try {
        const productSearch = await getById(pid)
        if (!productSearch) {
          CustomizedError.currentError(errorMessages.CANT_FIND_PRODUCT)
        } else {
          res.status(200).json({ message: 'Producto: ', productSearch })
        }
      } catch (error) {
        res.status(500).json({ message: error.message })
      }
} 

export const newProduct = async (req, res)=>{
    let { title, description, price, thumbnail, code, status, stock, category } = req.body;
    if(!thumbnail){
      thumbnail = []
    } 
    if (!title || !description || !price || !code || !stock || !category) {
      CustomizedError.currentError(errorMessages.CANT_CREATE_PRODUCT)
    }  
    const products = await ProductsManager.getProducts()
    if (products.some(product => product.code === code)) {
      return res.status(400).json({ message: "Articulo ya existente" });
    }
    try {
      if ('_id' in req.body) {
        delete req.body._id;
      }
      let owner 
      req.user.role === "premium" ? owner= req.user.email : owner= "admin"
      const newProduct = await create({...req.body, owner})
    res.status(200).json({ message: "Producto creado", product: newProduct })
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
} 

export const updateProduct = async (req, res) => {
  const { pid } = req.params;
  try {
    const productSearch = await update(pid, req.body);
    if (productSearch === -1) {
      CustomizedError.currentError(errorMessages.CANT_FIND_PRODUCT)
    } else {
      res.status(200).json({ message: "Producto actualizado correctamente", productSearch});
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export const deleteProduct = async (req, res) => {
  const { pid } = req.params;
  try {
      const currentUser = req.user
      const productDelete = await deleteOne(pid, currentUser);
      if (productDelete === -1) {
        CustomizedError.currentError(errorMessages.CANT_FIND_PRODUCT)
      } else {
        res.status(200).send({message: "Producto eliminado"});
      }
    } catch (error) {
      res.status(500).send(error.message);
  }
}
