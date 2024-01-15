const chai = require('chai');
const sinon = require('sinon');
const productsController = require('../../../src/controllers/products.controller');

const { expect } = chai;

describe('Products Controller', function () {
  describe('createProduct', function () {
    it('should create a product', async function () {
      const mockProduct = {
        id: 1,
        name: 'Product 1',
      };
      
      const req = {
        body: mockProduct,
      };
      
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };
      
      const stub = sinon.stub(productsController, 'createProduct').returns(mockProduct);
      
      await productsController.createProduct(req, res);
      
      expect(res.status.calledOnceWith(201));
      expect(res.json.calledOnceWith(mockProduct));
      
      stub.restore();
    });

    it('should return an error when name is empty', async function () {
      const mockProduct = {
        id: 1,
        name: '',
      };
        
      const req = {
        body: mockProduct,
      };
        
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };
        
      const stub = sinon.stub(productsController, 'createProduct').returns(mockProduct);
        
      await productsController.createProduct(req, res);
        
      expect(res.status.calledOnceWith(500));
      expect(res.json.calledOnceWith({ message: 'Product name is required' }));
        
      stub.restore();
    });
  });
});
