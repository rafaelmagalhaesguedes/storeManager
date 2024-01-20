const chai = require('chai');
const sinon = require('sinon');
const httpMocks = require('node-mocks-http');
const validate = require('../../../src/middlewares/sales.middleware');
const productsModel = require('../../../src/models/products.model');

const { expect } = chai;

describe('Sales Middleware', function () {
  afterEach(function () {
    sinon.restore();
  });

  describe('validateSale', function () {
    it('should call next when validation is successful', async function () {
      const req = httpMocks.createRequest({
        body: [{ productId: 1, quantity: 2 }],
      });
      const res = httpMocks.createResponse();
      const next = sinon.stub();

      sinon.stub(productsModel, 'findProductById').returns({ id: 1, quantity: 2 });

      await validate.validateSale(req, res, next);

      expect(next.calledOnce).to.equal(true);
    });

    it('should return 404 when product does not exist', async function () {
      const req = httpMocks.createRequest({
        body: [{ productId: 1, quantity: 2 }],
      });
      const res = httpMocks.createResponse();
      const next = sinon.stub();

      sinon.stub(productsModel, 'findProductById').returns(null);

      await validate.validateSale(req, res, next);

      expect(res.statusCode).to.equal(404);
      expect(next.called).to.equal(false);
    });
  });

  describe('validateSalesProductQuantity', function () {
    it('should call next when validation is successful', function () {
      const req = httpMocks.createRequest({
        body: { quantity: 2 },
      });
      const res = httpMocks.createResponse();
      const next = sinon.stub();

      validate.validateSalesProductQuantity(req, res, next);

      expect(next.calledOnce).to.equal(true);
    });

    it('should return 400 when quantity is not provided', function () {
      const req = httpMocks.createRequest({
        body: {},
      });
      const res = httpMocks.createResponse();
      const next = sinon.stub();

      validate.validateSalesProductQuantity(req, res, next);

      expect(res.statusCode).to.equal(400);
      expect(next.called).to.equal(false);
    });

    it('should return 422 when quantity is less than 1', function () {
      const req = httpMocks.createRequest({
        body: { quantity: 0 },
      });
      const res = httpMocks.createResponse();
      const next = sinon.stub();

      validate.validateSalesProductQuantity(req, res, next);

      expect(res.statusCode).to.equal(422);
      expect(next.called).to.equal(false);
    });
  });
});