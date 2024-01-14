const productsModel = require('../models/products.model');

const findAllProducts = async () => {
  const products = await productsModel.findAllProducts();
  
  return products;
};

const findProductById = async (id) => {
  const product = await productsModel.findProductById(id);

  if (!product) throw new Error('Product not found');
  
  return product;
};

module.exports = {
  findAllProducts,
  findProductById,
};