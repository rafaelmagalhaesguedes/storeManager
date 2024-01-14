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

module.exports = {
  getAllProducts,
  getProductById,
};