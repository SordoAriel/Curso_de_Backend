import { Router }from 'express'
import { deleteProduct, getAllProducts, getProductById, newProduct, updateProduct } from '../controllers/products.controller.js';
import { authorizationMiddleware } from '../middlewares/middlewares.js';

const router = Router();

router.get("/", getAllProducts);
    
router.get("/:pid", getProductById);

router.post("/", authorizationMiddleware(["admin", "premium"]), newProduct);

router.put("/:pid", authorizationMiddleware(["admin"]), updateProduct);

router.delete("/:pid", authorizationMiddleware(["admin", "premium"]), deleteProduct);

export default router
