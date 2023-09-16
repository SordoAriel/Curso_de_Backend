import express from 'express';
import { ProductsManager } from './ProductManager.js';


const app = express()

app.get("/products", async (req,res)=>{
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
    
app.get("/products/:pid", async (req,res)=>{
    const {pid} = req.params
    console.log(req.params)
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

app.listen(8080, () => {
    console.log('Escuchando al puerto 8080')
  })