// Barrel Routes
const express = require('express');

const router = express.Router();

const productsRoutes = require('./products.routes');
const salesRoutes = require('./sales.routes');

router.use(productsRoutes);
router.use(salesRoutes);

module.exports = router;