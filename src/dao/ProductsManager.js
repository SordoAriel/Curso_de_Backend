import { productsModel } from "./models/products.model.js";
import BasicManager from "./BasicManager.js";

class ProductsManager extends BasicManager {
  constructor() {
    super(productsModel);
  }
}

export const productsManager = new ProductsManager();
