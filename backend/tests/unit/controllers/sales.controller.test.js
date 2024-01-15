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
});