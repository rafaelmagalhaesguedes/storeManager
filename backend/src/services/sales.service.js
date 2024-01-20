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
  const [sale] = await salesModel.findSale(id);
  
  if (!sale) throw new Error('Sale not found');

  const result = await salesModel.deleteSale(id);

  return result;
};

const updateSaleProductQuantity = async (saleId, productId, quantity) => {
  const [sale] = await salesModel.findSale(saleId);

  if (!sale) throw new Error('Sale not found');

  const [product] = await salesModel.findProduct(productId);
  
  if (!product) throw new Error('Product not found in sale');

  const result = await salesModel.updateSaleProductQuantity(saleId, productId, quantity);

  return result[0];
};

module.exports = {
  findAllSales,
  findSaleById,
  createSale,
  deleteSale,
  updateSaleProductQuantity,
};