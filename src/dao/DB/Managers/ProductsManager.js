import { productsModel } from "../models/products.model.js";
import BasicManager from "./BasicManager.js";

class ProductsManager extends BasicManager {
  constructor() {
    super(productsModel);
  }
  async getWithAdvancedSearch(obj){
    const {limit=10, page=1, sort:sortByPrice, ...query} = obj
    const advancedSearch = await this.model.paginate(query, {limit, page, sort:{price: sortByPrice==='asc' ? 1 : -1  }, lean:true})
    const prevLink = advancedSearch.hasPrevPage ? `http://localhost:8080/products?page=${advancedSearch.prevPage}&limit=${limit}` : null
    const nextLink = advancedSearch.hasNextPage ? `http://localhost:8080/products?page=${advancedSearch.nextPage}&limit=${limit}` : null
    const response = {
      status: advancedSearch.totalDocs >= 1 ? 'success' : 'error',
      payload: advancedSearch.docs,
      totalPages: advancedSearch.totalPages,
      page: advancedSearch.page,
      prevPage: advancedSearch.prevPage,
      nextPage: advancedSearch.nextPage,
      hasPrevPage: advancedSearch.hasPrevPage,
      hasNextPage: advancedSearch.hasNextPage,
      prevLink: prevLink,
      nextLink: nextLink
    }
    return response;
  }

  async updateStock(obj){
    try {
      const updateProducts = obj.map(async (p) => {
        await this.model.updateOne(
          { _id: p.product._id },
          { $inc: { stock: -p.quantity } }
        );
      });
      if(updateProducts){
        return 1
      } else {
        return -1
      }
    } catch (error) {
      error
    }
    
  }
}

export const productsManager = new ProductsManager();
