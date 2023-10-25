import { usersModel } from "../models/users.model.js";
import BasicManager from "./BasicManager.js";
import mongoose from 'mongoose'

class UsersManager extends BasicManager {
  constructor() {
    super(usersModel);
  }

  async findByEmail(email){
    const userFound = await this.model.findOne({email});
    return userFound;
  }

}

export const usersManager = new UsersManager();
