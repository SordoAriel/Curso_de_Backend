import { Router } from "express";
import { cart, chat, home, login, products, realTimeProducts, signup } from "../controllers/views.controller.js";
import { usersAccess } from "../middlewares/middlewares.js";

const router = Router()

router.get('/home', home)

router.get('/realtimeproducts', realTimeProducts)

router.get('/chat', usersAccess,chat)

router.get('/products', products)

router.get('/carts/:cid', cart)

router.get('/signup', signup)

router.get('/login', login)

export default router
