import { Router }from 'express'
import { deleteProduct, getAllProducts, getProductById, newProduct, updateProduct } from '../controllers/products.controller.js';
import { adminAccess, manageProductsAccess, deleteProducts } from '../middlewares/middlewares.js';

const router = Router();

router.get("/", getAllProducts);
    
router.get("/:pid", getProductById);

router.post("/", manageProductsAccess, newProduct);

router.put("/:pid", adminAccess, updateProduct);

router.delete("/:pid", deleteProducts, deleteProduct);

export default router
