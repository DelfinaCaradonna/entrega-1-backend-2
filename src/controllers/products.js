import ProductDAO from "../dao/productDAO.js";

export async function createProductController(req, res) {
  try {
    const product = await ProductDAO.create(req.body);
    res.json({ message: "Producto creado exitosamente", product });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function updateProductController(req, res) {
  try {
    const product = await ProductDAO.updateById(req.params.id, req.body);
    if (!product)
      return res.status(404).json({ message: "Producto no encontrado" });
    res.json({ message: "Producto actualizado", product });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function deleteProductController(req, res) {
  try {
    const product = await ProductDAO.deleteById(req.params.id);
    if (!product)
      return res.status(404).json({ message: "Producto no encontrado" });
    res.json({ message: "Producto eliminado", product });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function getAllProductsController(req, res) {
  try {
    const products = await ProductDAO.findAll();
    res.json({ message: "Lista de productos obtenida", products });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function getProductByIdController(req, res) {
  try {
    const product = await ProductDAO.findById(req.params.id);
    if (!product)
      return res.status(404).json({ message: "Producto no encontrado" });
    res.json({ message: "Producto obtenido", product });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
