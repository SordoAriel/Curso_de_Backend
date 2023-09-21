import { ProductsManager } from '../ProductManager.js';
import { Router }from 'express'

const router = Router()

router.get("/", async (req,res)=>{
    const {limit} = req.query
    try {
        const products = await ProductsManager.getProducts(req.query);
        let limitedProducts = products;
        if (limit) {
          const limitNumber = parseInt(limit); 
          if (!isNaN(limitNumber)) {
            limitedProducts = products.slice(0, limitNumber);
          }
        }
        res.status(200).json({ message: 'Products found:', products: limitedProducts });
      } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
      }
    });
    
router.get("/:pid", async (req,res)=>{
    const {pid} = req.params
      try {
        const productSearch = await ProductsManager.getProductById(+pid)
        if (!productSearch) {
          res.status(400).json({ message: 'Product not found with the id sent' })
        } else {
          res.status(200).json({ message: 'Product: ', productSearch })
        }
      } catch (error) {
        res.status(500).json({ message: error })
      }
})

router.post("/", async (req, res)=>{
  const { title, description, price, thumbnail, code, status, stock, category } = req.body;
  if (!title || !description || !price || !code || !stock || !category) {
    return res.status(400).json({ message: "Oops! Parece que falta algún dato obligatorio" });
  }
  const products = await ProductsManager.getProducts()
  if (products.some(product => product.code === code)) {
    return res.status(400).json({ message: "Articulo ya existente" });
  }
  try {
    const newProduct = await ProductsManager.addProduct(req.body);
    res.status(200).json({ message: "Producto createdo", product: newProduct });
  } catch (error) {
    res.status(500).json({ message: error });
  }
})

router.put("/:pid", async (req, res) => {
  const { pid } = req.params;
  try {
    const productSearch = await ProductsManager.updateProduct(+pid, req.body);
    if (productSearch === -1) {
      res.status(400).json({ message: "Lo sentimos! No fue posible encontrar el producto indicado" });
    } else {
      res.status(200).json({ message: "Producto actualizado correctamente" });
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

router.delete("/:pid", async (req, res) => {
  const { pid } = req.params;
  try {
      const productDelete = await ProductsManager.deleteProduct(+pid);
      if (productDelete === -1) {
          res.status(400).json({ message: "Lo sentimos! No fue posible encontrar ese producto" });
      } else {
          res.status(200).json({ message: "Producto eliminado" });
      }
  } catch (error) {
      res.status(500).json({ message: error });
  }
})

export default router 