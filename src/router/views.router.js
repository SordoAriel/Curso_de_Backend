import { Router } from "express";
import { ProductsManager } from '../dao/FS/ProductManagerFS.js';
import { productsManager } from '../dao/DB/Managers/ProductsManager.js'
import { cartsManager } from '../dao/DB/Managers/CartsManager.js'
import { mongoose } from 'mongoose'

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
  try {
    const products = await productsManager.getWithAdvancedSearch(req.query);
    const cartId = await req.user.cartId.toString()
    res.status(200).render("products", {products, firstName: req.user.firstName, cid: cartId})
  } catch (error) {
    return error
  }
  
})

router.get('/carts/:cid', async (req, res) =>{
  const {cid} = req.params
  try {
    const displayCart = await cartsManager.getByIdAndPopulate(cid)
    const populatedProducts = displayCart[0].products.map(product => {
      return {
        title: product.product.title,
        description: product.product.description,
        code: product.product.code,
        thumbnails: product.product.thumbnails,
        price: product.product.price,
        quantity: product.quantity
      };
    })
  res.render("cart", {populatedProducts, cid})
  } catch (error) {
  }
})

router.get('/signup', async (req, res) => {
  res.render('signup')
})

router.get('/login', async (req, res) => {
  res.render('login')
})

export default router
