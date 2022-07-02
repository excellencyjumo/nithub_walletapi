const { Router } = require('express')
const WalletController = require("../controller/WalletController");
const auth = require("../../../middlwares/auth");

const walletRouter = Router();

const walletController = new WalletController();
walletRouter.post('/wallets', auth, walletController.createWallet);
walletRouter.get('/wallets', auth, walletController.getAllWallets);
walletRouter.get('/wallets/:id', auth, walletController.getWalletByID);
walletRouter.delete('/wallets/:id', auth, walletController.deleteWallet);
walletRouter.get('/wallets/:id/transactions',walletController.getTransactions);
// router.get('/wallets/:id/transactions/download',walletController.getTransactionsAsPDF)

module.exports = walletRouter;