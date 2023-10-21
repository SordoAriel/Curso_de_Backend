import { Router } from "express";
import { ProductsManager } from '../dao/FS/ProductManagerFS.js';
import { productsManager } from '../dao/DB/Managers/ProductsManager.js'
import { cartsManager } from '../dao/DB/Managers/CartsManager.js'

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
  try {
    const products = await ProductsManager.getProducts();
  res.render("realTimeProducts", { products });
  } catch (error) {
    return error
  }
})

router.get('/chat', async (req,res) =>{
  try {
    res.render("chat");
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
  
})

router.get('/products', async (req, res) =>{
  const products = await productsManager.getWithAdvancedSearch(req.query);
  res.render("products", {products})
})

router.get('/carts/:cid', async (req, res) =>{
  const {cid} = req.params
  try {
    const displayCart = await cartsManager.getByIdAndPopulate(cid)
  res.render("cart", {displayCart, cid})
  console.log(cid)
  } catch (error) {
    console.log(error)
  }
})

export default router
