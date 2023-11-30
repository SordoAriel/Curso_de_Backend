import { mongoose } from 'mongoose'
import { getProducts,  getByIdAndPopulate, getWithAdvancedSearch } from '../services/views.services.js';

export const home = async (req,res)=>{
    const {limit} = req.query
    try {
        const products = await getProducts(req.query);
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
}

export const realTimeProducts = async (req,res)=>{
    try {
        const products = await getProducts();
        res.render("realTimeProducts", { products });
    } catch (error) {
        return error
    }
}

export const chat = async (req,res) =>{
    try {
      res.render("chat");
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
}

export const products = async (req, res) =>{
    try {
      const products = await getWithAdvancedSearch(req.query);
      const cartId = await req.user.cartId.toString()
      res.status(200).render("products", {products, firstName: req.user.firstName, cid: cartId})
    } catch (error) {
      return error
    }
}

export const cart = async (req, res) =>{
    const {cid} = req.params
    try {
      const displayCart = await getByIdAndPopulate(cid)
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
        return error
    }
}

export const signup = async (req, res) => {
  res.render('signup')
}

export const login = async (req, res) => {
    res.render('login')
}
