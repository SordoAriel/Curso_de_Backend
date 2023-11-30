import { get, getById, create, update, deleteOne } from "../services/products.services.js";
import { ProductsManager } from '../dao/FS/ProductManagerFS.js';

export const getAllProducts = async (req,res)=>{
    try {
        const products = await get(req.query);
        if (!products) {
          res.status(400).json({ message: 'Oops! Parece que hubo un error en tu búsqueda'})
        }
        res.status(200).json({ message: 'Productos encontrados:', products: products });
      } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
      }
    }

export const getProductById = async (req,res)=>{
    const {pid} = req.params
      try {
        const productSearch = await getById(pid)
        if (!productSearch) {
          res.status(400).json({ message: 'Product not found with the id sent' })
        } else {
          res.status(200).json({ message: 'Product: ', productSearch })
        }
      } catch (error) {
        res.status(500).json({ message: error })
      }
}

export const newProduct = async (req, res)=>{
    const { title, description, price, thumbnail, code, status, stock, category } = req.body;
    if (!thumbnail in req.body){
      return req.body.push(thumbnail=[]) 
    }
    if (!title || !description || !price || !code || !stock || !category) {
      return res.status(400).json({ message: "Oops! Parece que falta algún dato obligatorio" });
    }  
    const products = await ProductsManager.getProducts()
    if (products.some(product => product.code === code)) {
      return res.status(400).json({ message: "Articulo ya existente" });
    }
    if (!Array.isArray(thumbnail)) {
      req.body.thumbnail = [];
    }
    try {
      if ('id' in req.body) {
        delete req.body.id;
      }
      const newProduct = await create(req.body)
    res.status(200).json({ message: "Producto createdo", product: newProduct })
      const newProductFS = await ProductsManager.addProduct(req.body);
    } catch (error) {
      res.status(500).json({ message: error });
    }
}

export const updateProduct = async (req, res) => {
  const { pid } = req.params;
  try {
    const productSearch = await update(pid, req.body);
    if (productSearch === -1) {
      res.status(400).json({ message: "Lo sentimos! No fue posible encontrar el producto indicado" });
    } else {
      res.status(200).json({ message: "Producto actualizado correctamente", productSearch});
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
}

export const deleteProduct = async (req, res) => {
  const { pid } = req.params;
  try {
      const productDelete = await deleteOne(pid);
      if (productDelete === -1) {
          res.status(400).json({ message: "Lo sentimos! No fue posible encontrar ese producto" });
      } else {
          res.status(200).json({ message: "Producto eliminado" });
      }
  } catch (error) {
      res.status(500).json({ message: error });
  }
}