const salesModel = require('../models/sales.model');

const findAllSales = async () => {
  const sales = await salesModel.findAllSales();
  return sales;
};

const findSaleById = async (id) => {
  const sale = await salesModel.findSaleById(id);
  return sale;
};

const createSale = async (itemsSold) => {
  const sale = await salesModel.createSale();
  
  const itemsSoldPromises = itemsSold.map((item) => {
    const { productId, quantity } = item;
    return salesModel.createSaleProduct(sale.insertId, productId, quantity);
  });

  await Promise.all(itemsSoldPromises);

  return { id: sale.insertId, itemsSold };
};

const deleteSale = async (id) => {
  const result = await salesModel.deleteSale(id);

  return result;
};

module.exports = {
  findAllSales,
  findSaleById,
  createSale,
  deleteSale,
};