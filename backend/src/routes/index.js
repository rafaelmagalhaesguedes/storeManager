// Barrel Routes
const express = require('express');
const productsRoutes = require('./products.routes');

const router = express.Router();

router.use(productsRoutes);

module.exports = router;