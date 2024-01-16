const express = require('express');
const salesController = require('../controllers/sales.controller');

const router = express.Router();
router.use(express.json());

// Route to get all sales
router.get('/sales', salesController.getAllSales);

// Route to get a sale by id
router.get('/sales/:id', salesController.getSaleById);

// Route to create a sale
router.post('/sales', salesController.createSale);

module.exports = router;