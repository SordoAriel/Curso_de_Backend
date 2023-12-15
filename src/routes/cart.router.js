import { Router }from 'express'
import { 
    addProduct, 
    newPurchase,
    deleteAllProducts, 
    createCart, 
    deleteOneProduct, 
    findCart, 
    updateCart, 
    updateQuantityFromOneProduct
} from '../controllers/carts.controller.js'
import { usersAccess } from '../middlewares/middlewares.js'

const router = Router()

router.get("/:cid", findCart)

router.post("/", createCart)

router.post("/:cid/product/:pid", usersAccess, addProduct);

router.post("/:cid/purchase", newPurchase)

router.put("/:cid", updateCart)

router.put("/:cid/products/:pid", updateQuantityFromOneProduct)

router.delete("/:cid/products/:pid", deleteOneProduct)

router.delete("/:cid", deleteAllProducts)

export default router
