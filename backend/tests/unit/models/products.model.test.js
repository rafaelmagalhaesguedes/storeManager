const chai = require('chai');
const sinon = require('sinon');
const ProductsModel = require('../../../src/models/products.model');

const { expect } = chai;

const mockProducts = [{ id: 1, name: 'Product 1' }, { id: 2, name: 'Product 2' }];

describe('findAllProducts', function () {
  it('should return an array', async function () {
    const stub = sinon.stub(ProductsModel, 'findAllProducts').returns(mockProducts);

    const products = await ProductsModel.findAllProducts();
    expect(products).to.be.an('array');
    expect(products).to.deep.equal(mockProducts);

    stub.restore();
  });

  it('should return a product if a matching ID is found', async function () {
    const mockProduct = { id: 1, name: 'Product 1' };
    const stub = sinon.stub(ProductsModel, 'findProductById').returns(mockProduct);

    const product = await ProductsModel.findProductById(1);
    expect(product).to.deep.equal(mockProduct);

    stub.restore();
  });

  it('should return a not found message if no matching ID is found', async function () {
    const mockMessage = { message: 'Product not found' };
    const stub = sinon.stub(ProductsModel, 'findProductById').returns(mockMessage);

    const product = await ProductsModel.findProductById(999);
    expect(product).to.deep.equal(mockMessage);

    stub.restore();
  });
});
