import CartDAO from "../dao/cartDAO.js";
import ticketModel from "../dao/models/ticketModel.js";
import productDAO from "../dao/productDAO.js";

export async function addToCartController(req, res) {
  try {
    const { productId } = req.params;
    const { quantity = 1 } = req.body;
    const userId = req.user.id;

    const cart = await CartDAO.addProduct(userId, productId, quantity);
    res.json({ message: "Producto agregado al carrito", cart });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function getCartController(req, res) {
  try {
    const userId = req.user.id;
    const cart = await CartDAO.findByUser(userId);

    const cartItems =
      cart?.products.map((p) => ({
        productId: p.productId._id,
        name: p.productId.name,
        price: p.productId.price,
        quantity: p.quantity,
        subtotal: p.productId.price * p.quantity,
      })) || [];

    const totalPrice = cartItems.reduce((acc, item) => acc + item.subtotal, 0);
    res.json({ cart: cartItems, totalPrice });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function updateCartItemController(req, res) {
  try {
    const { productId } = req.params;
    const { quantity } = req.body;
    const userId = req.user.id;

    const cart = await CartDAO.updateProduct(userId, productId, quantity);
    if (!cart)
      return res
        .status(404)
        .json({ message: "Producto o carrito no encontrado" });

    res.json({ message: "Producto actualizado", cart });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function removeFromCartController(req, res) {
  try {
    const { productId } = req.params;
    const userId = req.user.id;

    const cart = await CartDAO.removeProduct(userId, productId);
    if (!cart)
      return res
        .status(404)
        .json({ message: "Producto o carrito no encontrado" });

    res.json({ message: "Producto eliminado", cart });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function clearCartController(req, res) {
  try {
    const userId = req.user.id;
    await CartDAO.clearCart(userId);
    res.json({ message: "Carrito vaciado" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function purchaseCartController(req, res) {
  try {
    const userId = req.user.id;
    const userEmail = req.user.mail;
    const cart = await CartDAO.findByUser(userId);

    if (!cart || cart.products.length === 0)
      return res.status(400).json({ message: "El carrito está vacío" });

    const purchasedProducts = [];
    const notPurchasedProducts = [];
    let totalAmount = 0;

    for (const item of cart.products) {
      const product = await productDAO.findById(item.productId._id);
      if (!product) continue;

      if (product.stock >= item.quantity) {
        product.stock -= item.quantity;
        await ProductDAO.updateById(product._id, { stock: product.stock });

        purchasedProducts.push({
          productId: product._id,
          name: product.name,
          quantity: item.quantity,
          price: product.price,
        });
        totalAmount += product.price * item.quantity;
      } else {
        notPurchasedProducts.push({
          productId: product._id,
          name: product.name,
          quantity: item.quantity,
        });
      }
    }

    let ticket = null;
    if (purchasedProducts.length > 0) {
      ticket = await ticketModel.create({
        amount: totalAmount,
        purchaser: userEmail,
      });
    }

    await CartDAO.updateCartProducts(
      userId,
      notPurchasedProducts.map((p) => ({
        productId: p.productId,
        quantity: p.quantity,
      }))
    );

    res.json({ message: "Compra procesada", ticket, notPurchasedProducts });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
