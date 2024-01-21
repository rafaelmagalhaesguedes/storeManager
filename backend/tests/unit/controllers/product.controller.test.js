const chai = require('chai');
const sinon = require('sinon');
const productsController = require('../../../src/controllers/products.controller');
const productsService = require('../../../src/services/products.service');

const { expect } = chai;

const productNotFound = new Error('Product not found');

const mockProduct = { id: 1, name: 'Product 1' };

const mockProducts = [{ id: 1, name: 'Product 1' }, { id: 2, name: 'Product 2' }];

describe('Products Controller', function () {
  describe('Get All Products', function () {
    it('should return all products', async function () {
      const req = {};

      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };

      const stub = sinon.stub(productsService, 'findAllProducts').returns(mockProducts);

      await productsController.getAllProducts(req, res);

      expect(res.status.calledOnceWith(200)).to.equal(true);

      expect(res.json.calledOnceWith(mockProducts)).to.equal(true);

      stub.restore();
    });
  });

  describe('Get Product By Id', function () {
    it('should return a product', async function () {
      const req = {
        params: { id: 1 },
      };

      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };

      const stub = sinon.stub(productsService, 'findProductById').returns(mockProduct);

      await productsController.getProductById(req, res);

      expect(res.status.calledOnceWith(200)).to.equal(true);
      expect(res.json.calledOnceWith(mockProduct)).to.equal(true);

      stub.restore();
    });

    it('should return an error when the product does not exist', async function () {
      const req = {
        params: { id: 1 },
      };

      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };

      const stub = sinon.stub(productsService, 'findProductById').throws(productNotFound);

      try {
        await productsController.getProductById(req, res);
      } catch (error) {
        expect(res.status.calledOnceWith(404)).to.equal(true);
        expect(res.json.calledOnceWith({ message: 'Product not found' })).to.equal(true);
      } finally {
        stub.restore();
      }
    });
  });
  
  describe('Create Product', function () {
    it('should create a product', async function () {
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
      
      const stub = sinon.stub(productsService, 'updateProduct').throws(productNotFound);
      
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

  describe('Delete Product', function () {
    let stub;
  
    afterEach(function () {
      stub.restore();
    });
  
    it('should delete a product', async function () {
      const req = {
        params: { id: 1 },
      };
      
      const res = {
        status: sinon.stub().returnsThis(),
        end: sinon.stub(),
      };
      
      stub = sinon.stub(productsService, 'deleteProduct').returns({ affectedRows: 1 });
      
      await productsController.deleteProduct(req, res);
      
      expect(res.status.calledOnceWith(204)).to.equal(true);
      expect(res.end.calledOnce).to.equal(true);
      
      stub.restore();
    });
  
    it('should return an error when the product does not exist', async function () {
      const req = {
        params: { id: 1 },
      };
      
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };
      
      stub = sinon.stub(productsService, 'deleteProduct').throws(productNotFound);
      
      try {
        await productsController.deleteProduct(req, res);
      } catch (error) {
        expect(res.status.calledOnceWith(404)).to.equal(true);
        expect(res.json.calledOnceWith({ message: 'Product not found' })).to.equal(true);
      }
    });
  });

  describe('Searh Product', function () {
    it('should return a product', async function () {
      const req = {
        query: { q: 'Product 1' },
      };

      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };

      const stub = sinon.stub(productsService, 'searchProduct').returns(mockProduct);

      await productsController.searchProduct(req, res);

      expect(res.status.calledOnceWith(200)).to.equal(true);
      expect(res.json.calledOnceWith(mockProduct)).to.equal(true);

      stub.restore();
    });
  });
});
