const chai = require('chai');
const sinon = require('sinon');

const { expect } = chai;
const sinonChai = require('sinon-chai');

chai.use(sinonChai);

const salesService = require('../../../src/services/sales.service');
const salesController = require('../../../src/controllers/sales.controller');

const mockSales = [{ id: 1 }, { id: 2 }, { id: 3 }];

describe('Sales Controller', function () {
  afterEach(function () {
    sinon.restore();
  });

  describe('getAllSales', function () {
    it('should return all sales', async function () {
      const req = {};
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub().returnsThis(),
      };

      sinon.stub(salesService, 'findAllSales').resolves(mockSales);

      await salesController.getAllSales(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(mockSales);
    });
  });

  describe('getSaleById', function () {
    it('should return a specific sale by ID', async function () {
      const req = { params: { id: 1 } };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub().returnsThis(),
      };

      sinon.stub(salesService, 'findSaleById').withArgs(1).resolves(mockSales[0]);

      await salesController.getSaleById(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(mockSales[0]);
    });

    it('should return 404 sale not found', async function () {
      const req = { params: { id: 666 } };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub().returnsThis(),
      };

      sinon.stub(salesService, 'findSaleById').withArgs(666).resolves(null);

      await salesController.getSaleById(req, res);

      expect(res.status).to.have.been.calledWith(404);
    });
  });

  describe('createSale', function () {
    it('should create a sale and return status 201', async function () {
      const req = {
        body: [
          {
            productId: 1,
            quantity: 1,
          },
          {
            productId: 2,
            quantity: 5,
          },
        ],
      };

      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };

      const sale = {
        id: 3,
        itemsSold: req.body,
      };

      sinon.stub(salesService, 'createSale').resolves(sale);

      await salesController.createSale(req, res);

      expect(res.status.calledOnceWith(201)).to.equal(true);
      expect(res.json.calledOnceWith(sale)).to.equal(true);

      salesService.createSale.restore();
    });

    it('should return status 500 on error', async function () {
      const req = {
        body: [
          {
            productId: 1,
            quantity: 1,
          },
          {
            productId: 2,
            quantity: 5,
          },
        ],
      };

      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };

      sinon.stub(salesService, 'createSale').rejects(new Error('Error'));

      await salesController.createSale(req, res);

      expect(res.status.calledOnceWith(500));
      expect(res.json.calledOnceWith({ message: 'Error' }));

      salesService.createSale.restore();
    });
  });

  describe('deleteSale', function () {
    it('should delete a sale and return status 204', async function () {
      const req = { params: { id: 1 } };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };

      sinon.stub(salesService, 'deleteSale').resolves();

      await salesController.deleteSale(req, res);

      expect(res.status.calledOnceWith(204)).to.equal(false);
      expect(res.json.calledOnceWith()).to.equal(true);

      salesService.deleteSale.restore();
    });

    it('should return status 404 sale not found', async function () {
      const req = { params: { id: 666 } };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };

      sinon.stub(salesService, 'deleteSale').rejects(new Error('Sale not found'));

      await salesController.deleteSale(req, res);

      expect(res.status.calledOnceWith(404)).to.equal(true);
      expect(res.json.calledOnceWith({ message: 'Sale not found' })).to.equal(true);

      salesService.deleteSale.restore();
    });
  });

  describe('updateSaleProductQuantity', function () {
    it('should update a sale product quantity and return status 200', async function () {
      const req = {
        params: { id: 1 },
        body: {
          productId: 1,
          quantity: 1,
        },
      };

      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };

      sinon.stub(salesService, 'updateSaleProductQuantity').resolves();

      await salesController.updateSaleProductQuantity(req, res);

      expect(res.status.calledOnceWith(200)).to.equal(true);
      expect(res.json.calledOnceWith()).to.equal(true);

      salesService.updateSaleProductQuantity.restore();
    });

    it('should return status 404 sale not found', async function () {
      const req = {
        params: { id: 666 },
        body: {
          productId: 1,
          quantity: 1,
        },
      };

      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };

      sinon.stub(salesService, 'updateSaleProductQuantity').rejects(new Error('Sale not found'));

      await salesController.updateSaleProductQuantity(req, res);

      expect(res.status.calledOnceWith(404)).to.equal(true);
      expect(res.json.calledOnceWith({ message: 'Sale not found' })).to.equal(true);

      salesService.updateSaleProductQuantity.restore();
    });

    it('should return status 404 product not found in sale', async function () {
      const req = {
        params: { id: 1 },
        body: {
          productId: 666,
          quantity: 1,
        },
      };

      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };

      sinon.stub(salesService, 'updateSaleProductQuantity').rejects(new Error('Product not found in sale'));

      await salesController.updateSaleProductQuantity(req, res);

      expect(res.status.calledOnceWith(404)).to.equal(true);
      expect(res.json.calledOnceWith({ message: 'Product not found in sale' })).to.equal(true);

      salesService.updateSaleProductQuantity.restore();
    });
  });
});