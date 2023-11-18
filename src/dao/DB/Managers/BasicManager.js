export default class BasicManager {
    constructor(model, categoryToPopulate) {
      this.model = model;
      this.categoryToPopulate = categoryToPopulate;
    }
  
    async get() {
      return this.model.find().populate(this.categoryToPopulate);
    }
  
    async getById(id) {
      return this.model.findById(id).populate(this.categoryToPopulate);
    }
  
    async add(obj) {
      return this.model.create(obj);
    }
  
    async update(id, obj) {
      return this.model.updateOne({ _id: id }, obj);
    }
  
    async delete(id) {
      return this.model.deleteOne({ _id: id });
    }
  }
  