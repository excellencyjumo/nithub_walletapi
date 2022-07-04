const { Router } = require('express');
const WithdrawController = require("../controller/WithdrawController");
const auth = require("../../../middlwares/auth");

const withdrawalRouter = Router();

const withdrawController = new WithdrawController();
withdrawalRouter.post('/wallets/:id/withdrawals', auth,  withdrawController.makeWithdrawal);
withdrawalRouter.get('/wallets/:id/withdrawals',  auth, withdrawController.getAllWithdrawals);
withdrawalRouter.get('/wallets/:walletID/withdrawals/:id', auth, withdrawController.getWithdrawal);

module.exports = withdrawalRouter;