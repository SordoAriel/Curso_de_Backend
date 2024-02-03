import { Router } from "express";
import { cart, chat, home, login, products, realTimeProducts, signup, mockProducts, loggerTest, newPassword, manageProducts, documentsUpload, changeUserRol } from "../controllers/views.controller.js";
import { authorizationMiddleware } from "../middlewares/middlewares.js";

const router = Router()

router.get('/home', home)

router.get('/realtimeproducts', realTimeProducts)

router.get('/chat', authorizationMiddleware(["user", "premium"]) ,chat)

router.get('/products', products)

router.get('/carts/:cid', cart)

router.get('/signup', signup)

router.get('/login', login)

router.get('/mockingproducts', mockProducts)

router.get('/loggerTest', loggerTest)

router.get('/newpassword/:email', newPassword)

router.get('/manageProducts', authorizationMiddleware(["admin", "premium"]), manageProducts)

router.get('/documentsUpload', documentsUpload)

router.get('/changeUserRol', changeUserRol)

export default router
