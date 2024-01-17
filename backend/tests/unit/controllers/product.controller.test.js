const chai = require('chai');
const sinon = require('sinon');
const productsController = require('../../../src/controllers/products.controller');

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
      
      const stub = sinon.stub(productsController, 'updateProduct').returns(mockProduct);
      
      await productsController.updateProduct(req, res);
      
      expect(res.status.calledOnceWith(200));
      expect(res.json.calledOnceWith(mockProduct));
      
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
      
      const stub = sinon.stub(productsController, 'updateProduct').throws(new Error('Product not found'));
      
      try {
        await productsController.updateProduct(req, res);
      } catch (error) {
        expect(res.status.calledOnceWith(404));
        expect(res.json.calledOnceWith({ message: 'Product not found' }));
      } finally {
        stub.restore();
      }
    });
  });
});
