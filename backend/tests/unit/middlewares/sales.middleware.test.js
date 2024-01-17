const sinon = require('sinon');
const { expect } = require('chai');
const productsModel = require('../../../src/models/products.model');
const validate = require('../../../src/middlewares/sales.middleware');

describe('Sales Validation Middleware', function () {
  afterEach(function () {
    sinon.restore();
  });

  it('should call next when validation is successful', async function () {
    const req = {
      body: [{ productId: 1, quantity: 2 }],
    };
    const res = {
      status() { return this; },
      json() { return this; },
    };
    const next = sinon.stub();

    sinon.stub(productsModel, 'findProductById').returns(true);

    await validate.validateSale(req, res, next);

    expect(next.calledOnce).to.equal(true);
  });

  it('should not call next when validation fails', async function () {
    const req = {
      body: [{ productId: 1, quantity: 0 }],
    };
    const res = {
      status() { return this; },
      json() { return this; },
    };
    const next = sinon.stub();

    sinon.stub(productsModel, 'findProductById').returns(true);

    await validate.validateSale(req, res, next);

    expect(next.called).to.equal(false);
  });

  it('should not call next when product does not exist', async function () {
    const req = {
      body: [{ productId: 1, quantity: 2 }],
    };
    const res = {
      status() { return this; },
      json() { return this; },
    };
    const next = sinon.stub();

    sinon.stub(productsModel, 'findProductById').returns(false);

    await validate.validateSale(req, res, next);

    expect(next.called).to.equal(false);
  });
});