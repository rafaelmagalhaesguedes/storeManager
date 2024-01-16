const salesService = require('../services/sales.service');

const getAllSales = async (_req, res) => {
  try {
    const sales = await salesService.findAllSales();
    res.status(200).json(sales);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const getSaleById = async (req, res) => {
  const { id } = req.params;
  try {
    const sale = await salesService.findSaleById(id);
    if (!sale || sale.length === 0) throw new Error('Sale not found');
    res.status(200).json(sale);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const createSale = async (req, res) => {
  const itemsSold = req.body;
  try {
    const sale = await salesService.createSale(itemsSold);
    res.status(201).json(sale);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllSales,
  getSaleById,
  createSale,
};