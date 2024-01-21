const chai = require('chai');
const sinon = require('sinon');
const productsService = require('../../../src/services/products.service');
const productsModel = require('../../../src/models/products.model');

const { expect } = chai;

const mockProducts = [{ id: 1, name: 'Product 1' }, { id: 2, name: 'Product 2' }];

describe('Products Service', function () {
  describe('findAllProducts', function () {
    it('should return all products', async function () {
      const stub = sinon.stub(productsModel, 'findAllProducts').returns(mockProducts);

      const products = await productsService.findAllProducts();

      expect(products).to.be.an('array');
      expect(products).to.deep.equal(mockProducts);

      stub.restore();
    });
  });

  describe('findProductById', function () {
    it('should return a product if a matching ID is found', async function () {
      const mockProduct = { id: 1, name: 'Product 1' };
      const stub = sinon.stub(productsModel, 'findProductById').returns(mockProduct);

      const product = await productsService.findProductById(1);

      expect(product).to.deep.equal(mockProduct);

      stub.restore();
    });

    it('should throw an error if no matching ID is found', async function () {
      const stub = sinon.stub(productsModel, 'findProductById').returns(null);

      try {
        await productsService.findProductById(999);
      } catch (error) {
        expect(error).to.be.an('error');
        expect(error.message).to.equal('Product not found');
      }

      stub.restore();
    });
  });

  describe('createProduct', function () {
    it('should create a new product', async function () {
      const mockProduct = { id: 1, name: 'Product 1' };
      const stub = sinon.stub(productsModel, 'createProduct').returns(mockProduct);

      const product = await productsService.createProduct('Product 1');

      expect(product).to.deep.equal(mockProduct);

      stub.restore();
    });

    it('should throw an error if name is empty', async function () {
      const stub = sinon.stub(productsModel, 'createProduct').returns(null);

      try {
        await productsService.createProduct('');
      } catch (error) {
        expect(error).to.be.an('error');
        expect(error.message).to.equal('Product name is required');
      }

      stub.restore();
    });
  });

  describe('updateProduct', function () {
    afterEach(function () {
      sinon.restore();
    });

    it('should update an existing product and return the updated product', async function () {
      const mockProduct = { id: 1, name: 'Product 1' };
      const updatedProduct = { id: 1, name: 'Updated Product' };

      sinon.stub(productsModel, 'findProductById')
        .onFirstCall()
        .returns(mockProduct)
        .onSecondCall()
        .returns(updatedProduct);

      sinon.stub(productsModel, 'updateProduct')
        .returns(Promise.resolve());
        
      const result = await productsService.updateProduct(mockProduct.id, updatedProduct.name);

      expect(result).to.deep.equal(updatedProduct);
    });

    it('should throw an error if the product does not exist', async function () {
      const productId = 1;

      sinon.stub(productsModel, 'findProductById').returns(null);

      try {
        await productsService.updateProduct(productId, 'Product 1');
      } catch (error) {
        expect(error).to.be.an('error');
        expect(error.message).to.equal('Product not found');
      }
    });
  });

  describe('deleteProduct', function () {
    afterEach(function () {
      sinon.restore();
    });

    it('should delete an existing product', async function () {
      const mockProduct = { id: 1, name: 'Product 1' };

      sinon.stub(productsModel, 'findProductById').returns(mockProduct);

      sinon.stub(productsModel, 'deleteProduct').returns(Promise.resolve());

      const result = await productsService.deleteProduct(mockProduct.id);

      expect(result).to.equal(undefined);
    });

    it('should throw an error if the product does not exist', async function () {
      const productId = 1;

      sinon.stub(productsModel, 'findProductById').returns(null);

      try {
        await productsService.deleteProduct(productId);
      } catch (error) {
        expect(error).to.be.an('error');
        expect(error.message).to.equal('Product not found');
      }
    });
  });

  describe('searchProduct', function () {
    afterEach(function () {
      sinon.restore(); // Restore all stubs after each test
    });

    it('should return all products that match the search query', async function () {
      const mockProducts3 = [
        { id: 1, name: 'Product 1' },
        { id: 2, name: 'Traje de encolhimento' },
        { id: 3, name: 'Escudo do Capitão América' },
      ];

      sinon.stub(productsModel, 'searchProduct').returns(mockProducts3);

      const products = await productsService.searchProduct('Product');
  
      expect(products).to.be.an('array');
      expect(products).to.deep.equal(mockProducts3);
    });
  });
});