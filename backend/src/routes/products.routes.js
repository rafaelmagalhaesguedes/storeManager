const express = require('express');
const productsController = require('../controllers/products.controller');
const middlewares = require('../middlewares/products.validation');

const router = express.Router();
router.use(express.json());

// Routes of products
router.get('/products', productsController.getAllProducts);

// Routes of products by id
router.get('/products/:id', productsController.getProductById);

// Routes of products create
router.post('/products', middlewares.validateProductName, productsController.createProduct);

module.exports = router;
