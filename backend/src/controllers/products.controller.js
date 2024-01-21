const productsService = require('../services/products.service');

const getAllProducts = async (_req, res) => {
  try {
    const products = await productsService.findAllProducts();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await productsService.findProductById(id);
    res.status(200).json(product);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const createProduct = async (req, res) => {
  const { name } = req.body;
  try {
    const product = await productsService.createProduct(name);
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    const result = await productsService.updateProduct(id, name);
    res.status(200).json(result);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    await productsService.deleteProduct(id);
    res.status(204).end();
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const searchProduct = async (req, res) => {
  const { q } = req.query;
  try {
    const products = await productsService.searchProduct(q);
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  searchProduct,
};