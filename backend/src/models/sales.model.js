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

module.exports = { findAllSales, findSaleById };