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
import { transporter } from "../nodemailer.js";
import CustomizedError from "../errors/customized.errors.js";
import { errorMessages } from "../errors/errors.enum.js";
import { logger } from "../winston.js"

export const findCart = async (req,res) => {
    const { cid } = req.params
    try {
        const displayCart = await getById(cid)
        if(!displayCart){
            CustomizedError.currentError(errorMessages.CANT_FIND_CART)
        } else {
        res.status(200).json({ message: "Búsqueda exitosa", cart: displayCart });
        }
    } catch (error) {
        res.status(500).send({ message: error.message });
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
    const quant = parseInt(quantity)
    let email
    if(req.user.role === "premium"){
        email= req.user.email
    } else {
        email= " . "
    }
    try {
        const cart = await addProductToCart(cid, pid, quant, email);
        console.log(cart)
        switch (cart) {
            case -1:
                CustomizedError.currentError(errorMessages.CANT_FIND_CART);
                break;
            case -2: 
                return res.status(403).send("No puedes agregar tus propios productos a tu carrito");        
            default:
                res.status(200).json({
                    message: 'Se añadió el producto al carrito correctamente',
                    product: cart,
                });
                break;
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const newPurchase = async (req, res) => {
    try {
        const {cid} = req.params
        const { email } = req.user
        const purchase = await endPurchase(cid)
        if(purchase === -1){
            CustomizedError.currentError(errorMessages.NOTHING_TO_PURCHASE)
        } else {
            const ticket = await newTicket(purchase.total, email)
            if(!ticket){
                CustomizedError.currentError(errorMessages.CANT_PURCHASE)
            }else {
                const purchaseConfirmMail = {
                    from: 'a.a.sordo@gmail.com',
                    to: email,
                    subject: `Compra efectuada n°${ticket.code} - Ferretería Ferros`,
                    html: `<h1>Código de su compra:${ticket.code}</h1>
                            <h2>Monto total a pagar: ${ticket.amount}</h2>
                            <h3>Cliente: ${req.user.firstName} ${req.user.lastName}</h3>
                            <p>Fecha de la compra: ${ticket.purchase_datatime}</p>
                        `
                }
                await transporter.sendMail(purchaseConfirmMail)
                logger.info(`Nuevo ticket registrado n°${ticket.code}`)
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
            CustomizedError.currentError(errorMessages.CANT_UPDATE_CART)
        } else {
            res.status(200).json({
                message: 'Carrito actualizado',
                products: updatedProducts,
            });
        }
    }
    catch (error){
        res.status(500).json({mesage: error.message})
    }
}

export const updateQuantityFromOneProduct = async (req, res) =>{
    const {cid, pid} = req.params
    const {quantity} = req.body
    try {
        const updatedQuantity = await updateQuantity(cid, pid, quantity);
        if (updatedQuantity === -1){
            CustomizedError.currentError(errorMessages.CANT_UPDATE_CART)
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
            CustomizedError.currentError(errorMessages.CANT_DELETE_CARTS_PRODUCTS)
        } else {
            res.status(200).json({ message: 'Carrito actualizado'})
        }
    } catch (error) {
        res.status(500).json({mesage: error.message})
    }
}

export const deleteAllProducts = async (req, res) =>{
    const {cid} = req.params
    try {
        const delAllProducts = await cleanCart(cid)
        if(delAllProducts === -1){
            CustomizedError.currentError(errorMessages.CANT_DELETE_CARTS_PRODUCTS)
        } else {
            res.status(200).json({ message: 'Carrito vaciado'})
        }    
    } catch (error) {
        res.status(500).json({mesage: error.message})
    }
}
