const chai = require('chai');
const sinon = require('sinon');
const productsService = require('../../../src/services/products.service');
const productsModel = require('../../../src/models/products.model');

const { expect } = chai;

const mockProducts = [{ id: 1, name: 'Product 1' }, { id: 2, name: 'Product 2' }];

describe('Products Service', function () {
  afterEach(function () {
    sinon.restore();
  });

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
});