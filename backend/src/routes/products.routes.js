const express = require('express');
const productsController = require('../controllers/products.controller');
const middlewares = require('../middlewares/products.middleware');

const router = express.Router();
router.use(express.json());

// Routes of products
router.get('/products', productsController.getAllProducts);

// Routes of products search
router.get('/products/search', productsController.searchProduct);

// Routes of products by id
router.get('/products/:id', productsController.getProductById);

// Routes of products create
router.post('/products', middlewares.validateProductName, productsController.createProduct);

// Routes of products update
router.put('/products/:id', middlewares.validateProductName, productsController.updateProduct);

// Routes of products delete
router.delete('/products/:id', productsController.deleteProduct);

module.exports = router;
