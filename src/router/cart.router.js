import { Router }from 'express'
import { CartsManager } from '../CartsManager.js'

const router = Router()

router.get("/:cid", async (req, res)=>{
    const { cid } = req.params
    try {
        const displayCart = await CartsManager.getCartById(+cid)
        if(!displayCart){
            res.status(400).json({ message: "Lo sentimos, no pudimos encontrar tu compra" });
        }
        res.status(200).json({ message: "Búsqueda exitosa", productos: displayCart });
    } catch (error) {
        res.status(500).json({ message: error });
    }
})

router.post("/", async (req, res)=>{
    try {
        const newCart = await CartsManager.newCart();
        res.status(201).json({ message: "Nuevo carrito creado", cart: newCart });
      } catch (error) {
        res.status(500).json({ message: error });
      }
})

router.post("/:cid/product/:pid", async (req, res) => {
    const { cid, pid } = req.params;
    const { quantity } = req.body;
    try {
        if(!quantity || quantity === +0){
            res.status(400).json({ message: "Es necesario ingresar una cantidad válida mayor a 0" });
            return "Es necesario ingresar una cantidad válida mayor a 0"
        }
        const choosenCart = await CartsManager.addToCart(cid, {
            pid: pid,
            quantity: quantity,
        });
        if (choosenCart === -1) {
            res.status(400).json({ message: 'Lo sentimos! No fue posible encontrar el carrito indicado' });
        } else {
            res.status(200).json({
                message: 'Se añadió el producto al carrito correctamente',
            cart: choosenCart,
            });
        }
    } catch (error) {
        res.status(500).json({ message: error });
    }
  });

export default router
