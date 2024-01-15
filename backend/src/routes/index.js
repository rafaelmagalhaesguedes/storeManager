// Barrel Routes
const express = require('express');
const productsRoutes = require('./products.routes');
const salesRoutes = require('./sales.routes');

const router = express.Router();

router.use(productsRoutes);
router.use(salesRoutes);

module.exports = router;