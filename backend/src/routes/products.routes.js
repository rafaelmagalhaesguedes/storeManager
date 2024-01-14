const express = require('express');
const productsController = require('../controllers/products.controller');

const router = express.Router();

// Rota de produtos
router.get('/products', productsController.getAllProducts);

// Rota de produtos por id
router.get('/products/:id', productsController.getProductById);

module.exports = router;