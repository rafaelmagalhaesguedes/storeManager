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
  });

  describe('createSale', function () {
    it('should create a sale', async function () {
      const mockSale = [
        { productId: 1, quantity: 2 },
        { productId: 2, quantity: 2 },
      ];

      const stub = sinon.stub(salesModel, 'createSale').returns({ insertId: 1 });

      const result = await salesService.createSale(mockSale);

      expect(result).to.eql({ id: 1, itemsSold: mockSale });

      stub.restore();
    });
  });

  describe('deleteSale', function () {
    it('should delete a sale', async function () {
      const stub = sinon.stub(salesModel, 'deleteSale').returns({});

      const result = await salesService.deleteSale(1);

      expect(result).to.eql({});

      stub.restore();
    });
  });

  describe('updateSaleProductQuantity', function () {
    afterEach(function () {
      sinon.restore();
    });
  
    it('should throw an error if the sale does not exist', async function () {
      sinon.stub(salesModel, 'findSale').returns([{}]);
    
      try {
        await salesService.updateSaleProductQuantity(1, 1, 1);
      } catch (error) {
        expect(error.message).to.equal('Sale not found');
      }
    });
    
    it('should throw an error if the product does not exist', async function () {
      sinon.stub(salesModel, 'findSale').returns([{}]);
      sinon.stub(salesModel, 'findProduct').returns([]);
    
      try {
        await salesService.updateSaleProductQuantity(1, 1, 1);
      } catch (error) {
        expect(error.message).to.equal('Product not found in sale');
      }
    });
  
    it('should update the product quantity and return the updated product', async function () {
      const updatedProduct = { saleId: 1, productId: 1, quantity: 1 };
      
      sinon.stub(salesModel, 'findSale').returns([{}]);
      sinon.stub(salesModel, 'findProduct').returns([{}]);
      sinon.stub(salesModel, 'updateSaleProductQuantity').returns([updatedProduct]);
      
      const result = await salesService.updateSaleProductQuantity(1, 1, 1);
      
      expect(result).to.eql(updatedProduct);
    });
  });
});