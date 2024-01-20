const connection = require('./connection');

const findAllSales = async () => {
  const [rows] = await connection.execute(
    `SELECT sales.id as saleId,
            sales.date,
            sales_products.product_id as productId,
            sales_products.quantity 
     FROM sales 
     JOIN sales_products ON sales.id = sales_products.sale_id
     ORDER BY saleId ASC, productId ASC`,
  );

  return rows;
};

const findSaleById = async (id) => {
  const [rows] = await connection.execute(`SELECT sales.date,
        sales_products.product_id as productId,
        sales_products.quantity 
     FROM sales 
     JOIN sales_products ON sales.id = sales_products.sale_id 
     WHERE sales.id = ?
     ORDER BY productId ASC`, [id]);
     
  return rows;
};

const createSale = async () => {
  const [sale] = await connection.execute('INSERT INTO sales () VALUES ()');
  return sale;
};

const createSaleProduct = async (saleId, productId, quantity) => {
  const [saleProduct] = await connection.execute(
    'INSERT INTO sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)',
    [saleId, productId, quantity],
  );

  return saleProduct;
};

const deleteSale = async (id) => {
  const [saleExists] = await connection.execute('SELECT * FROM sales WHERE id = ?', [id]);
  
  if (saleExists.length === 0) {
    throw new Error('Sale not found');
  }

  const [result] = await connection.execute('DELETE FROM sales WHERE id = ?', [id]);
  return result;
};

module.exports = {
  findAllSales,
  findSaleById,
  createSale,
  createSaleProduct,
  deleteSale,
};