const express = require('express');
const salesController = require('../controllers/sales.controller');
const middlewares = require('../middlewares/sales.middleware');

const router = express.Router();
router.use(express.json());

// Route to get all sales
router.get('/sales', salesController.getAllSales);

// Route to get a sale by id
router.get('/sales/:id', salesController.getSaleById);

// Route to create a sale
router.post('/sales', middlewares.validateSale, salesController.createSale);

// Route to delete a sale
router.delete('/sales/:id', salesController.deleteSale);

// Route to update a sale product quantity
router.put(
  '/sales/:saleId/products/:productId/quantity',
  middlewares.validateSalesProductQuantity,
  salesController.updateSaleProductQuantity,
);

module.exports = router;