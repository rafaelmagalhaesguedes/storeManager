const chai = require('chai');
const sinon = require('sinon');
const validate = require('../../../src/middlewares/sales.middleware');
const productsModel = require('../../../src/models/products.model');

const { expect } = chai;

describe('Sales Middleware', function () {
  afterEach(function () {
    sinon.restore();
  });

  describe('validateSale', function () {
    it('should call next when validation is successful', async function () {
      const req = { body: [{ productId: 1, quantity: 2 }] };
      const res = { 
        statusCode: 200, 
        status(code) { 
          this.statusCode = code; 
          return this; 
        }, 
        json() {},
      };
      const next = sinon.stub();

      sinon.stub(productsModel, 'findProductById').returns({ id: 1, quantity: 2 });

      await validate.validateSale(req, res, next);

      expect(next.calledOnce).to.equal(true);
    });

    it('should return 400 when productId is not provided', async function () {
      const req = { body: [{ quantity: 2 }] };
      const res = { 
        statusCode: 200, 
        status(code) { 
          this.statusCode = code; 
          return this; 
        }, 
        json() {},
      };
      const next = sinon.stub();
    
      sinon.stub(productsModel, 'findProductById').returns({ id: 1, quantity: 2 });
    
      await validate.validateSale(req, res, next);
    
      expect(res.statusCode).to.equal(400);
      expect(next.called).to.equal(true);
    });

    it('should return 400 when quantity is not provided', async function () {
      const req = { body: [{ productId: 1 }] };
      const res = { 
        statusCode: 200, 
        status(code) { 
          this.statusCode = code; 
          return this; 
        }, 
        json() {},
      };
      const next = sinon.stub();

      sinon.stub(productsModel, 'findProductById').returns({ id: 1, quantity: 2 }); // Stub to return a product

      await validate.validateSale(req, res, next);

      expect(res.statusCode).to.equal(400);
      expect(next.called).to.equal(true);
    });

    it('should return 422 when quantity is less than 1', async function () {
      const req = { body: [{ productId: 1, quantity: 0 }] };
      const res = { 
        statusCode: 200, 
        status(code) { 
          this.statusCode = code; 
          return this; 
        }, 
        json() {},
      };

      const next = sinon.stub();
      sinon.stub(productsModel, 'findProductById').returns({ id: 1, quantity: 2 }); // Stub to return a product

      await validate.validateSale(req, res, next);

      expect(res.statusCode).to.equal(422);
      expect(next.called).to.equal(true);
    });
  });

  describe('validateSalesProductQuantity', function () {
    it('should call next when validation is successful', function () {
      const req = { body: { quantity: 2 } };
      const res = {
        statusCode: 200,
        status(code) { 
          this.statusCode = code;
          return this;
        },
        json() {},
      };
      const next = sinon.stub();

      validate.validateSalesProductQuantity(req, res, next);

      expect(next.calledOnce).to.equal(true);
    });

    it('should return 400 when quantity is not provided', function () {
      const req = { body: {} };
      const res = {
        statusCode: 200,
        status(code) {
          this.statusCode = code;
          return this;
        },
        json() {},
      };
      const next = sinon.stub();

      validate.validateSalesProductQuantity(req, res, next);

      expect(res.statusCode).to.equal(400);
      expect(next.called).to.equal(false);
    });

    it('should return 422 when quantity is less than 1', function () {
      const req = { body: { quantity: 0 } };
      const res = {
        statusCode: 200,
        status(code) {
          this.statusCode = code;
          return this;
        },
        json() {},
      };
      const next = sinon.stub();

      validate.validateSalesProductQuantity(req, res, next);

      expect(res.statusCode).to.equal(422);
      expect(next.called).to.equal(false);
    });
  });
});