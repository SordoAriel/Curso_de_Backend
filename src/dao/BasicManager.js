export default class BasicManager {
    constructor(model) {
      this.model = model;
    }
  
    async get() {
      return this.model.find().lean();
    }
  
    async getById(id) {
      return this.model.findById(id);
    }
  
    async add(obj) {
      console.log("obj", obj);
      return this.model.create(obj);
    }
  
    async update(id, obj) {
      return this.model.updateOne({ _id: id }, obj);
    }
  
    async delete(id) {
      return this.model.deleteOne({ _id: id });
    }
  }
  