import { Router } from "express";
import { ProductsManager } from '../ProductManager.js';

const router = Router()

router.get('/home', async (req,res)=>{
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
        res.render('home', {limitedProducts})
      } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
      }
})

router.get('/realtimeproducts', async (req,res)=>{
  const products = await ProductsManager.getProducts();
  res.render("realTimeProducts", { products });
})

export default router
