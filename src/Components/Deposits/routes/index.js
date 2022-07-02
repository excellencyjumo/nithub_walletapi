const { Router } = require('express');
const DepositController = require("../controller/DepositController");
const auth = require("../../../middlwares/auth");

const depositRouter = Router();
const depositController = new DepositController();

depositRouter.post('/wallets/:id/deposits', auth, depositController.makeDeposit);
depositRouter.get('/wallets/:id/deposits', auth, depositController.getAllDeposits);
depositRouter.get('/wallets/:walletID/deposits/:id', auth, depositController.getDepositByID);

module.exports = depositRouter;