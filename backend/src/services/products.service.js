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

const createProduct = async (name) => {
  const product = await productsModel.createProduct(name);

  if (!product) throw new Error('Product name is required');
  
  return product;
};

const updateProduct = async (id, name) => {
  const product = await productsModel.findProductById(id);

  if (!product) throw new Error('Product not found');
  
  await productsModel.updateProduct(id, name);

  const updatedProduct = await productsModel.findProductById(id);

  return updatedProduct;
};

const deleteProduct = async (id) => {
  const product = await productsModel.findProductById(id);

  if (!product) throw new Error('Product not found');
  
  const result = await productsModel.deleteProduct(id);

  return result;
};

module.exports = {
  findAllProducts,
  findProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};