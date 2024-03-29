import { Router }from 'express'
import { 
    addProduct,
    newPurchase,
    deleteAllProducts, 
    createCart, 
    deleteOneProduct, 
    findCart,
    updateQuantityFromOneProduct
} from '../controllers/carts.controller.js'
import { authorizationMiddleware } from '../middlewares/middlewares.js'

const router = Router()

router.get("/:cid", findCart)

router.post("/", createCart)

router.post("/:cid/product/:pid", authorizationMiddleware(["user", "premium"]), addProduct);

router.post("/:cid/purchase", newPurchase)

router.put("/:cid/product/:pid", updateQuantityFromOneProduct)

router.delete("/:cid/product/:pid", deleteOneProduct)

router.delete("/:cid", deleteAllProducts)

export default router
