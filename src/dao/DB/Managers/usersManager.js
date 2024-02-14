import { usersModel } from "../models/users.model.js";
import { cartsModel } from "../models/carts.model.js";
import BasicManager from "./BasicManager.js";
import mongoose from 'mongoose'

class UsersManager extends BasicManager {
  constructor() {
    super(usersModel);
  }

  async findByEmail(email){
    const userFound = await this.model.findOne({email}).populate({ path: "cartId", populate: { path: "products.product" } })
    return userFound;
  }

  async updateMany(id, obj) {
    const updateDocs = await this.model.updateMany({ _id: id, 'documents.name': { $in: obj.map(doc => doc.name) } },
      { $set: { 'documents.$': obj } });
    const user = await this.model.findById(id);
    const userDocs = user.documents;
    return userDocs;
  }

  async deleteByEmail(email) {
    const deletedUser = await this.model.deleteOne({email: email})
    return cleanedUser(deletedUser)
  }

  async deleteMany(emails) {
    const deletedUsers = await this.model.deleteMany({email: {$in: emails}})
    return deletedUsers
  }

}

export const usersManager = new UsersManager();
