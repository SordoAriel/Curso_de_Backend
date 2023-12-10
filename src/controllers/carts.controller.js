import { 
    getById, 
    newCart, 
    addProductToCart, 
    updateProductFromCart, 
    updateQuantity, 
    deleteOneProductFromCart, 
    cleanCart, 
    endPurchase
} from "../services/carts.services.js";
import { newTicket } from "../services/tickets.services.js"

export const findCart = async (req,res) => {
    const { cid } = req.params
    try {
        const displayCart = await getById(cid)
        if(!displayCart){
            res.status(400).json({ message: "Lo sentimos, no pudimos encontrar tu compra" });
        }
        res.status(200).json({ message: "Búsqueda exitosa", cart: displayCart });
    } catch (error) {
        res.status(500).json({ message: error });
    }
}

export const createCart = async (req, res)=>{
    const cart = req.body 
    if(!cart){
        cart.products[0].product = mongoose.Types.ObjectId(cartData.products[0].product);
        cart.products[0].quantity = parseInt(cartData.products[0].quantity, 10);
    }
    try {
        const createNewCart = await newCart(cart);
        res.status(201).json({ message: "Nuevo carrito creado", cart: createNewCart });
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
}

export const addProduct = async (req, res) => {
    const { cid, pid } = req.params;
    const { quantity } = req.body;
    try {
        const cart = await addProductToCart(cid, pid, quantity);
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
}

export const newPurchase = async (req, res) => {
    try {
        const {cid} = req.params
        const { email } = req.user
        const purchase = await endPurchase(cid)
        if(purchase === -1){
            res.status(404).json("Lo sentimos, parece que no hay productos en el carrito, o no contamos con stock suficiente")
        } else {
            const ticket = await newTicket(purchase.total, email)
            if(!ticket){
                res.status(404).json("Parece que no fue posible finalizar la compra")
            }else {
                res.status(200).send(
                    {message: "Compra finalizada con éxito", 
                    "Datos de la compra": ticket, 
                    "Productos sin stock suficiente": purchase.notEnoughStockProducts})
            }
        }
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

export const updateCart = async (req, res) => {
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
}

export const updateQuantityFromOneProduct = async (req, res) =>{
    const {cid, pid} = req.params
    const {quantity} = req.body
    try {
        const updatedQuantity = await updateQuantity(cid, pid, quantity);
        if (updatedQuantity === -1){
            res.status(400).json({message: 'Lo sentimos! No fue posible cambiar la cantidad del producto seleccionado'});
        } else {
            res.status(200).json({ message: 'Carrito actualizado', products: updatedQuantity})
        }
    } catch (error) {
        res.status(500).json({mesage: error})
    }
}

export const deleteOneProduct = async (req, res) =>{
    const {cid, pid} = req.params
    try {
        const deletedProduct = await deleteOneProductFromCart(cid, pid)
        if (deletedProduct === -1){
            res.status(400).json({message: 'Lo sentimos! No fue posible eliminar el producto seleccionado'});
        } else {
            res.status(200).json({ message: 'Carrito actualizado'})
        }
    } catch (error) {
        res.status(500).json({mesage: error})
    }
}

export const deleteAllProducts = async (req, res) =>{
    const {cid} = req.params
    try {
        const delAllProducts = await cleanCart(cid)
        if(delAllProducts === -1){
            res.status(400).json({message: 'Lo sentimos! No fue posible vaciar el carrito'});
        } else {
            res.status(200).json({ message: 'Carrito vaciado'})
        }    
    } catch (error) {
        res.status(500).json({mesage: error})
    }
}
