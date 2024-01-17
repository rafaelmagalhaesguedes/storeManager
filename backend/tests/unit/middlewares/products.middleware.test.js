const sinon = require('sinon');
const { expect } = require('chai');
const productsValidation = require('../../../src/middlewares/products.middleware');

describe('Products Validation Middleware', function () {
  it('should call next when name is valid', function () {
    const req = {
      body: {
        name: 'T-Shirt Cruzeiro Esporte Clube',
      },
    };
    const res = {};
    const next = sinon.stub();

    productsValidation.validateProductName(req, res, next);

    expect(next.calledOnce).to.equal(true);
  });
});