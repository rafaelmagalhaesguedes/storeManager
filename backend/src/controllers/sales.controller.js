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
  try {
    const sale = await salesService.createSale(req.body);
    res.status(201).json(sale);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteSale = async (req, res) => {
  const { id } = req.params;
  try {
    await salesService.deleteSale(id);
    res.status(204).end();
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const updateSaleProductQuantity = async (req, res) => {
  const { saleId, productId } = req.params;
  const { quantity } = req.body;

  try {
    const updatedSale = await salesService.updateSaleProductQuantity(saleId, productId, quantity);
    res.status(200).json(updatedSale);
  } catch (error) {
    if (error.message === 'Sale not found') {
      res.status(404).json({ message: 'Sale not found' });
    } else if (error.message === 'Product not found in sale') {
      res.status(404).json({ message: 'Product not found in sale' });
    } else {
      res.status(400).json({ message: error.message });
    }
  }
};

module.exports = {
  getAllSales,
  getSaleById,
  createSale,
  deleteSale,
  updateSaleProductQuantity,
};