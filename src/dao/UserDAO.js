import userModel from "./models/userModel.js";

class UserDAO {
  async create(userData) {
    return await userModel.create(userData);
  }

  async findOne(query) {
    return await userModel.findOne(query);
  }

  async findById(id) {
    return userModel.findById(id).lean();
  }

  async updateOne(query, updateData) {
    return await userModel.updateOne(query, updateData);
  }
}

export default new UserDAO();
