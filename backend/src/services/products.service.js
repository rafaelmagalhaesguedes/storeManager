const productsModel = require('../models/products.model');

const findAllProducts = async () => {
  // Return all products
  const products = await productsModel.findAllProducts();
  
  return products;
};

const findProductById = async (id) => {
  // Check if product exists
  const product = await productsModel.findProductById(id);

  // If product does not exist, throw an error
  if (!product) throw new Error('Product not found');
  
  return product;
};

const createProduct = async (name) => {
  // Check if product name is empty
  const product = await productsModel.createProduct(name);

  // If product name is empty, throw an error
  if (!product) throw new Error('Product name is required');
  
  return product;
};

const updateProduct = async (id, name) => {
  // Check if product exists
  const product = await productsModel.findProductById(id);

  // If product does not exist, throw an error
  if (!product) throw new Error('Product not found');
  
  // If product exists, update it
  await productsModel.updateProduct(id, name);

  // Return the updated product
  const updatedProduct = await productsModel.findProductById(id);
  return updatedProduct;
};

const deleteProduct = async (id) => {
  // Check if product exists
  const product = await productsModel.findProductById(id);

  // If product does not exist, throw an error
  if (!product) throw new Error('Product not found');
  
  // If product exists, delete it
  const result = await productsModel.deleteProduct(id);

  // Return the result
  return result;
};

const searchProduct = async (name) => {
  // Name is empty, return all products
  if (!name) {
    const products = await productsModel.findAllProducts();
    return products;
  }

  // Name is not empty, search products by name
  const products = await productsModel.searchProduct(name);
  return products;
};

module.exports = {
  findAllProducts,
  findProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  searchProduct,
};