import { Router }from 'express'
import { CartsManager } from '../dao/FS/CartsManagerFS.js'
import { cartsManager } from '../dao/DB/Managers/CartsManager.js'

const router = Router()

router.get("/:cid", async (req, res)=>{
    const { cid } = req.params
    try {
        const displayCart = await cartsManager.getByIdAndPopulate(cid)
        if(!displayCart){
            res.status(400).json({ message: "Lo sentimos, no pudimos encontrar tu compra" });
        }
        res.status(200).json({ message: "Búsqueda exitosa", cart: displayCart });
    } catch (error) {
        res.status(500).json({ message: error });
    }
})

router.post("/", async (req, res)=>{
    try {
        const newCart = await cartsManager.add(req.body);
        res.status(201).json({ message: "Nuevo carrito creado", cart: newCart });
      } catch (error) {
        res.status(500).json({ message: error });
      }
})

router.post("/:cid/product/:pid", async (req, res) => {
    const { cid, pid } = req.params;
    const { quantity } = req.body;
    try {
        const cart = await cartsManager.addProductToCart(cid, pid, quantity);
        if (cart === -1) {
            res.status(400).json({ message: 'Lo sentimos! No fue posible encontrar el carrito indicado' });
        } else {
            res.status(200).json({
                message: 'Se añadió el producto al carrito correctamente',
                product: cart,
            });
        }
    } catch (error) {
        res.status(500).json({ message: error });
    }
});

router.put("/:cid", async (req, res) => {
    const {cid} = req.params
    try{
        const updatedProducts = await cartsManager.updateProductFromCart(cid, req.body); 
        if (updatedProducts === -1) {
            res.status(400).json({ message: 'Lo sentimos! No fue posible actualizar el carrito' });
        } else {
            res.status(200).json({
                message: 'Carrito actualizado',
                products: updatedProducts,
            });
        }
    }
    catch (error){
        res.status(500).json({mesage: error})
    }
})

router.put("/:cid/products/:pid", async (req, res) =>{
    const {cid, pid} = req.params
    const {quantity} = req.body
    try {
        const updatedQuantity = await cartsManager.updateQuantity(cid, pid, quantity);
        if (updatedQuantity === -1){
            res.status(400).json({message: 'Lo sentimos! No fue posible cambiar la cantidad del producto seleccionado'});
        } else {
            res.status(200).json({ message: 'Carrito actualizado', products: updatedQuantity})
        }
    } catch (error) {
        res.status(500).json({mesage: error})
    }
})

router.delete("/:cid/products/:pid", async (req, res) =>{
    const {cid, pid} = req.params
    try {
        const deletedProduct = await cartsManager.delProductFromCart(cid, pid)
        if (deletedProduct === -1){
            res.status(400).json({message: 'Lo sentimos! No fue posible eliminar el producto seleccionado'});
        } else {
            res.status(200).json({ message: 'Carrito actualizado'})
        }
    } catch (error) {
        res.status(500).json({mesage: error})
    }
})

router.delete("/:cid", async (req, res) =>{
    const {cid} = req.params
    try {
        const delAllProducts = await cartsManager.delAllProductsFromCart(cid)
        if(delAllProducts === -1){
            res.status(400).json({message: 'Lo sentimos! No fue posible vaciar el carrito'});
        } else {
            res.status(200).json({ message: 'Carrito vaciado'})
        }    
    } catch (error) {
        res.status(500).json({mesage: error})
    }
})

export default router
