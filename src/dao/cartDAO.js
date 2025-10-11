import cartModel from "./models/cartModel.js";

class CartDAO {
  async create(cartData) {
    return await cartModel.create(cartData);
  }

  async findByUser(userId) {
    return await cartModel.findOne({ user: userId }).populate(
      "products.productId"
    );
  }

  async addProduct(userId, productId, quantity = 1) {
    let cart = await this.findByUser(userId);
    if (!cart) {
      cart = await this.create({ user: userId, products: [] });
    }

    const item = cart.products.find(
      (p) => p.productId._id.toString() === productId
    );
    if (item) item.quantity += quantity;
    else cart.products.push({ productId, quantity });

    await cart.save();
    return cart;
  }

  async updateProduct(userId, productId, quantity) {
    const cart = await this.findByUser(userId);
    if (!cart) return null;

    const item = cart.products.find(
      (p) => p.productId._id.toString() === productId
    );
    if (!item) return null;

    item.quantity = quantity;
    await cart.save();
    return cart;
  }

  async removeProduct(userId, productId) {
    const cart = await this.findByUser(userId);
    if (!cart) return null;

    cart.products = cart.products.filter(
      (p) => p.productId._id.toString() !== productId
    );
    await cart.save();
    return cart;
  }

  async clearCart(userId) {
    return await cartModel.updateOne(
      { user: userId },
      { $set: { products: [] } }
    );
  }

  async updateCartProducts(userId, products) {
    const cart = await this.findByUser(userId);
    if (!cart) return null;
    cart.products = products;
    await cart.save();
    return cart;
  }
}

export default new CartDAO();
