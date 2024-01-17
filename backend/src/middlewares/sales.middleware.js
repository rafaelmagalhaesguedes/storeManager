const Joi = require('joi');
const productsModel = require('../models/products.model');

/* 
  Schema to validate the items in the request body.
*/
const schema = Joi.object({
  productId: Joi.number().required(),
  quantity: Joi.number().min(1).required(),
});

/* 
  Function to check if the product exists in the database.
*/
const checkProductExistence = async (productId, res) => {
  const product = await productsModel.findProductById(productId);
  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }
};

/* 
  Function to handle the error messages.
*/
const handleErrorMessage = (errorMessage, res) => {
  const productErrorMessage = errorMessage.includes('"productId" is required');
  const quantityErrorMessage = errorMessage.includes('"quantity" is required');

  if (productErrorMessage || quantityErrorMessage) {
    return res.status(400).json({ message: errorMessage });
  }

  if (errorMessage.includes('"quantity" must be greater than or equal to 1')) {
    return res.status(422).json({ message: errorMessage });
  }
};

/* 
  Function to validate the items in the request body.
*/
const validateItem = async (item, res) => {
  const { error } = schema.validate(item);

  if (error) {
    const errorMessage = error.details[0].message;
    const errorResponse = handleErrorMessage(errorMessage, res);
    if (errorResponse) return errorResponse;
  }

  const productResponse = await checkProductExistence(item.productId, res);
  if (productResponse) return productResponse;
};

/* 
  Function to validate the sale.
*/
const validateSale = async (req, res, next) => {
  const itemsSold = req.body;

  const promises = itemsSold.map((item) => validateItem(item, res));

  const results = await Promise.all(promises);

  const errorResponse = results.find((result) => result);
  if (errorResponse) return errorResponse;

  next();
};

module.exports = { validateSale };