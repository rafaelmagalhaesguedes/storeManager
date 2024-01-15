const express = require('express');
const salesController = require('../controllers/sales.controller');

const router = express.Router();
router.use(express.json());

router.get('/sales', salesController.getAllSales);

router.get('/sales/:id', salesController.getSaleById);

module.exports = router;