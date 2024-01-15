const express = require('express');
const productsController = require('../controllers/products.controller');

const router = express.Router();
router.use(express.json());

// Rota de produtos
router.get('/products', productsController.getAllProducts);

// Rota de produtos por id
router.get('/products/:id', productsController.getProductById);

// Rota de criação de produtos
router.post('/products', productsController.createProduct);

module.exports = router;
