const chai = require('chai');
const sinon = require('sinon');
const salesService = require('../../../src/services/sales.service');
const salesModel = require('../../../src/models/sales.model');

const { expect } = chai;

describe('Sales Service', function () {
  describe('findAllSales', function () {
    it('should return all sales', async function () {
      const mockSales = [
        { saleId: 1, date: '2021-09-09T04:54:29.000Z', productId: 1, quantity: 2 },
        { saleId: 1, date: '2021-09-09T04:54:54.000Z', productId: 2, quantity: 2 },
      ];

      const stub = sinon.stub(salesModel, 'findAllSales').returns(mockSales);

      const result = await salesService.findAllSales();

      expect(result).to.eql(mockSales);

      stub.restore();
    });
  });

  describe('findSaleById', function () {
    it('should return a sale by id', async function () {
      const mockSale = [
        { date: '2021-09-09T04:54:29.000Z', productId: 1, quantity: 2 },
        { date: '2021-09-09T04:54:54.000Z', productId: 2, quantity: 2 },
      ];

      const stub = sinon.stub(salesModel, 'findSaleById').returns(mockSale);

      const result = await salesService.findSaleById(1);

      expect(result).to.eql(mockSale);

      stub.restore();
    });

    it('should return 404 when sale is not found', async function () {
      const stub = sinon.stub(salesService, 'findSaleById').returns(Promise.resolve(null));

      try {
        await salesService.findSaleById(999);
      } catch (err) {
        expect(err.status).to.equal(404);
        expect(err.message).to.equal('Sale not found');
      }

      stub.restore();
    });
  });
});