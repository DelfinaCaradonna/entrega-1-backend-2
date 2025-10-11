import productModel from "./models/productModel.js";

class ProductDAO {
  async create(data) {
    return await productModel.create(data);
  }

  async findById(id) {
    return await productModel.findById(id);
  }

  async findAll(query = {}) {
    return await productModel.find(query);
  }

  async updateById(id, data) {
    return await productModel.findByIdAndUpdate(id, data, { new: true });
  }

  async deleteById(id) {
    return await productModel.findByIdAndDelete(id);
  }
}

export default new ProductDAO();
