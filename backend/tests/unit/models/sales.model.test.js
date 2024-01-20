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

      const stub = sinon.stub(connection, 'execute').resolves([[mockSale]]);

      const sale = await salesModel.findSaleById(1);

      expect(sale).to.eql(mockSale);

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
});