const { Router } = require('express');
const TransferController = require("../controller/TransferController");
const auth = require("../../../middlwares/auth");

const walletRouter = Router();

const transferController = new TransferController();
walletRouter.post('/wallets/:id/transfers', auth, transferController.makeTransfer);
walletRouter.get('/wallets/:id/transfers', auth, transferController.getAllTransfers);
walletRouter.get('/wallets/:walletID/transfers/:id', auth, transferController.getTransfer);

module.exports = walletRouter;