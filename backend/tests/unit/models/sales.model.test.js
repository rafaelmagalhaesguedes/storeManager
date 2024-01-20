const chai = require('chai');
const sinon = require('sinon');
const salesModel = require('../../../src/models/sales.model');
const connection = require('../../../src/models/connection');

const { expect } = chai;

describe('Sales Model', function () {
  describe('findAllSales()', function () {
    it('should return an array of sales', async function () {
      const mockSales = [{ id: 1, productId: 1, quantity: 1 }, { id: 2, productId: 2, quantity: 2 }];

      const stub = sinon.stub(connection, 'execute').resolves([mockSales]);

      const sales = await salesModel.findAllSales();

      expect(sales).to.eql(mockSales);

      stub.restore();
    });
  });

  describe('findSaleById()', function () {
    it('should return a sale', async function () {
      const mockSale = { id: 1, productId: 1, quantity: 1 };

      const stub = sinon.stub(connection, 'execute').resolves([mockSale]);

      const sale = await salesModel.findSaleById(1);

      expect(sale).to.eql(mockSale);

      stub.restore();
    });
  });

  describe('findSale()', function () {
    it('should return a sale', async function () {
      const mockSale = { id: 1, productId: 1, quantity: 1 };
  
      const stub = sinon.stub(connection, 'execute').resolves([mockSale]);
  
      const sale = await salesModel.findSale(1);
  
      expect(sale).to.eql(mockSale);
  
      stub.restore();
    });
  });
  
  describe('findProduct()', function () {
    it('should return a product', async function () {
      const mockProduct = { id: 1, name: 'Product 1', price: 100 };
  
      const stub = sinon.stub(connection, 'execute').resolves([mockProduct]);
  
      const product = await salesModel.findProduct(1);
  
      expect(product).to.eql(mockProduct);
  
      stub.restore();
    });
  });

  describe('createSale()', function () {
    it('should create a sale', async function () {
      const mockSale = { id: 1 };

      const stub = sinon.stub(connection, 'execute').resolves([{ id: 1 }]);

      const sale = await salesModel.createSale();

      expect(sale).to.eql(mockSale);

      stub.restore();
    });
  });

  describe('createSaleProduct()', function () {
    it('should create a sale product', async function () {
      const mockSaleProduct = { id: 1 };

      const stub = sinon.stub(connection, 'execute').resolves([{ id: 1 }]);

      const saleProduct = await salesModel.createSaleProduct(1, 1, 1);

      expect(saleProduct).to.eql(mockSaleProduct);

      stub.restore();
    });
  });

  describe('deleteSale()', function () {
    it('should delete a sale', async function () {
      const mockResult = { affectedRows: 1 };

      const stub = sinon.stub(connection, 'execute').resolves([{ affectedRows: 1 }]);

      const result = await salesModel.deleteSale(1);

      expect(result).to.eql(mockResult);

      stub.restore();
    });
  });

  describe('updateSaleProductQuantity()', function () {
    it('should update a sale product quantity', async function () {
      const mockSaleProduct = { id: 1 };

      const stub = sinon.stub(connection, 'execute').resolves([{ id: 1 }]);

      const saleProduct = await salesModel.updateSaleProductQuantity(1, 1, 1);

      expect(saleProduct).to.eql(mockSaleProduct);

      stub.restore();
    });
  });
});