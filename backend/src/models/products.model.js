const connection = require('./connection');

const findAllProducts = async () => {
  const [rows] = await connection.execute('SELECT * FROM products ORDER BY id ASC');
  return rows;
};

const findProductById = async (id) => {
  const [rows] = await connection.execute('SELECT * FROM products WHERE id = ?', [id]);  
  return rows[0];
};

const createProduct = async (name) => {
  const [rows] = await connection.execute('INSERT INTO products (name) VALUES (?)', [name]);

  const newProduct = {
    id: rows.insertId,
    name,
  };

  return newProduct;
};

module.exports = {
  findAllProducts,
  findProductById,
  createProduct,
};