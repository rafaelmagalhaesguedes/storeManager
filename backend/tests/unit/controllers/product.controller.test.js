const chai = require('chai');
const sinon = require('sinon');
const productsController = require('../../../src/controllers/products.controller');
const productsService = require('../../../src/services/products.service');

const { expect } = chai;

describe('Products Controller', function () {
  describe('Create Product', function () {
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
      
      const stub = sinon.stub(productsService, 'createProduct').returns(mockProduct);
      
      await productsController.createProduct(req, res);
      
      expect(res.status.calledOnceWith(201)).to.equal(true);
      expect(res.json.calledOnceWith(mockProduct)).to.equal(true);
      
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
        
      const stub = sinon.stub(productsService, 'createProduct').returns(mockProduct);
        
      await productsController.createProduct(req, res);
        
      expect(res.status.calledOnceWith(500)).to.equal(false);
      expect(res.json.calledOnceWith({ message: 'Product name is required' })).to.equal(false);
        
      stub.restore();
    });
  });

  describe('Update Product', function () {
    it('should update a product', async function () {
      const mockProduct = {
        id: 1,
        name: 'Updated Product',
      };
      
      const req = {
        params: { id: 1 },
        body: mockProduct,
      };
      
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };
      
      const stub = sinon.stub(productsService, 'updateProduct').returns(mockProduct);
      
      await productsController.updateProduct(req, res);
      
      expect(res.status.calledOnceWith(200)).to.equal(true);
      expect(res.json.calledOnceWith(mockProduct)).to.equal(true);
      
      stub.restore();
    });

    it('should return an error when the product does not exist', async function () {
      const req = {
        params: { id: 1 },
        body: { name: 'Updated Product' },
      };
      
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };
      
      const stub = sinon.stub(productsService, 'updateProduct').throws(new Error('Product not found'));
      
      try {
        await productsController.updateProduct(req, res);
      } catch (error) {
        expect(res.status.calledOnceWith(404)).to.equal(true);
        expect(res.json.calledOnceWith({ message: 'Product not found' })).to.equal(true);
      } finally {
        stub.restore();
      }
    });
  });
});
