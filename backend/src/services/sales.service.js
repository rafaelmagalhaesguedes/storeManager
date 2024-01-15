const salesModel = require('../models/sales.model');

const findAllSales = async () => {
  const sales = await salesModel.findAllSales();
  
  return sales;
};

const findSaleById = async (id) => {
  const sale = await salesModel.findSaleById(id);
  
  return sale;
};

module.exports = {
  findAllSales,
  findSaleById,
};