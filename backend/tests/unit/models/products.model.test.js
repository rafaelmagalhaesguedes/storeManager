const chai = require('chai');
const sinon = require('sinon');
const ProductsModel = require('../../../src/models/products.model');
const connection = require('../../../src/models/connection');

const { expect } = chai;

const mockProducts = [{ id: 1, name: 'Product 1' }, { id: 2, name: 'Product 2' }];

describe('Products Model', function () {
  // Create a Sinon sandbox
  const sandbox = sinon.createSandbox();

  // Restore all stubs after each test
  afterEach(function () {
    sandbox.restore();
  });

  describe('findAllProducts()', function () {
    it('should return an array of products', async function () {
      // Use the sandbox to create the stub
      sandbox.stub(connection, 'execute').resolves([mockProducts]);

      const products = await ProductsModel.findAllProducts();

      expect(products).to.eql(mockProducts);
    });
  });

  describe('findProductById()', function () {
    it('should return a product', async function () {
      // Use the sandbox to create the stub
      sandbox.stub(connection, 'execute').resolves([[mockProducts[0]]]); // Note the double array
  
      const product = await ProductsModel.findProductById(1);
  
      expect(product).to.eql(mockProducts[0]);
    });
  });

  describe('createProduct()', function () {
    it('should create a product', async function () {
      // Use the sandbox to create the stub
      sandbox.stub(connection, 'execute').resolves([{ insertId: 1 }]);

      const product = await ProductsModel.createProduct('Product 1');

      expect(product).to.eql({ id: 1, name: 'Product 1' });
    });
  });

  describe('updateProduct()', function () {
    it('should update a product', async function () {
      // Use the sandbox to create the stub
      sandbox.stub(connection, 'execute').resolves([{ affectedRows: 1 }]);

      const product = await ProductsModel.updateProduct(1, 'Product 1');

      expect(product.affectedRows).to.eql(1);
    });
  });

  describe('deleteProduct()', function () {
    it('should delete a product', async function () {
      // Use the sandbox to create the stub
      sandbox.stub(connection, 'execute').resolves([{ affectedRows: 1 }]);

      const product = await ProductsModel.deleteProduct(1);

      expect(product.affectedRows).to.eql(1);
    });
  });

  describe('searchProduct()', function () {
    it('should return an array of products', async function () {
      // Use the sandbox to create the stub
      sandbox.stub(connection, 'execute').resolves([mockProducts]);

      const products = await ProductsModel.searchProduct('Product');

      expect(products).to.eql(mockProducts);
    });
  });
});
