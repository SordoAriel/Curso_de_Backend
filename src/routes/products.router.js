import { Router }from 'express'
import { deleteProduct, getAllProducts, getProductById, newProduct, updateProduct } from '../controllers/products.controller.js';
import { adminAccess } from '../middlewares/middlewares.js';

const router = Router();

router.get("/", getAllProducts);
    
router.get("/:pid", getProductById);

router.post("/", adminAccess, newProduct);

router.put("/:pid", adminAccess, updateProduct);

router.delete("/:pid", adminAccess, deleteProduct);

export default router
