import { mongoose } from 'mongoose'
import { getProducts,  getByIdAndPopulate, getWithAdvancedSearch } from '../services/views.services.js';
import { generateMockProduct } from '../faker.js';
import { logger } from '../winston.js';
import fs from 'fs'

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
      const cid = await req.user.cartId.toString()
      const productsWithCid = products.payload.map(product => ({ ...product, cid: cid }));
      res.status(200).render("products", {products: { payload: productsWithCid}, firstName: req.user.firstName, cid: cid})
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

export const mockProducts = async (req, res) => {
  try {
    let products = []
    for( let i = 0; i < 100; i++){
      const newProduct = await generateMockProduct();
      products.push(newProduct)
  }
      res.status(200).send(products)
  } catch (error) {
    res.status(500).send(message.error)
  }
}

export const loggerTest = (req, res) => {   
  logger.fatal("fatal"),
  logger.error("error"),
  logger.warning("warning"),
  logger.info("info"),
  logger.http("http"),
  logger.debug("debug")
  const errorFiles = async () => {
    try {
      const errorsFile = await fs.promises.readFile('./errors.log', 'utf-8');
    logger.http(errorsFile)
    } catch (error) {
      error.message
    }
  }
  errorFiles()
  logger.http('Ubicación de los loggers: carts.controller -> endPurchase / app.js -> Puerto & Conexión de cliente al chat & Desconexión de cliente al chat configDB.js -> conexión a la DB & error en la conexxión a la DB / middleware.js -> unauthorized / passport.js -> Estrategia local de signup')
}
