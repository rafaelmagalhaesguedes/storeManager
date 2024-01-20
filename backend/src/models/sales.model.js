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

const findSale = async (saleId) => {
  const [sale] = await connection.execute('SELECT * FROM sales WHERE id = ?', [saleId]);
  return sale;
};

const findProduct = async (productId) => {
  const [product] = await connection.execute('SELECT * FROM products WHERE id = ?', [productId]);
  return product;
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
  const [result] = await connection.execute('DELETE FROM sales WHERE id = ?', [id]);
  return result;
};

const updateSaleProductQuantity = async (saleId, productId, quantity) => {
  await connection.execute(`UPDATE sales_products SET quantity = ? 
    WHERE sale_id = ? AND product_id = ?`, [quantity, saleId, productId]);

  const [updatedProduct] = await connection.execute(
    `SELECT sales.date, sales_products.product_id as productId,
     sales_products.quantity, sales_products.sale_id as saleId
     FROM sales_products 
     JOIN sales ON sales.id = sales_products.sale_id 
     WHERE sale_id = ? AND product_id = ?`,
    [saleId, productId],
  );

  return updatedProduct;
};

module.exports = {
  findAllSales,
  findSaleById,
  findSale,
  findProduct,
  createSale,
  createSaleProduct,
  deleteSale,
  updateSaleProductQuantity,
};