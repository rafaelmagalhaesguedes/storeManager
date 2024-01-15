const chai = require('chai');
const sinon = require('sinon');
const salesModel = require('../../../src/models/sales.model');

const { expect } = chai;

describe('Sales Model', function () {
  describe('findAllSales', function () {
    it('should return all sales', async function () {
      const mockSales = [
        { saleId: 1, date: '2021-09-09T04:54:29.000Z', productId: 1, quantity: 2 },
      ];
      
      const stub = sinon.stub(salesModel, 'findAllSales').returns(mockSales);
      
      const result = await salesModel.findAllSales();
      
      expect(result).to.eql(mockSales);
      // eslint-disable-next-line no-unused-expressions
      expect(stub.calledOnce).to.be.true;
      
      stub.restore();
    });
  });

  describe('findSaleById', function () {
    it('should return a sale by id', async function () {
      const mockSale = [
        { date: '2021-09-09T04:54:29.000Z', productId: 1, quantity: 2 },
      ];
      
      const stub = sinon.stub(salesModel, 'findSaleById').returns(mockSale);
      
      const result = await salesModel.findSaleById(1);
      
      expect(result).to.eql(mockSale);
      // eslint-disable-next-line no-unused-expressions
      expect(stub.calledOnce).to.be.true;
      
      stub.restore();
    });
  });
});