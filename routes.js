const { Router } = require('express');
const auth = require('./auth');
const UserController = require('./Controllers/UserController');
const WalletController = require('./Controllers/WalletController');
const DepositController = require('./Controllers/DepositController.js');
const WithdrawController = require('./Controllers/WithdrawController.js');
const TransferController = require('./Controllers/TransferController.js');

const router = Router();

// users
const userController = new UserController();
router.post('/auth/users', userController.createUser);
router.post('/auth/users/login',userController.loginUser);
// router.put('/users/:userID/wallets',  userController.createWallet);
// router.get('/users/:userID/wallets', userController.getAllWallets);
// router.delete('/users/:userID/wallets/:walletID', userController.deleteWallet);

// wallets
const walletController = new WalletController();
router.post('/wallets', auth, walletController.createWallet);
// router.get('/wallets', walletController.getAllWallets);
// router.get('/wallets/:id', walletController.getWalletByID);
// router.delete('/wallets/:id', walletController.deleteWalletByID);
// router.get('/wallets/:id/transactions/download',walletController.getTransactions)
//
// //deposit
const depositController = new DepositController();
router.post('/wallets/:id/deposits', auth, depositController.makeDeposit);
// router.get('/wallets/:id/deposits', depositController.getAllDeposits);
// router.get('/wallets/:wallet_id/deposits/:id', depositController.getDepositByID);
//
// //withdraw
const withdrawController = new WithdrawController();
router.post('/wallets/:id/withdrawals',auth,  withdrawController.makeWithdrawal);
// router.get('/wallets/:id/withdrawals', withdrawController.getAllWithdrawals);
// router.get('/wallets/:wallet_id/withdrawals/:id', withdrawController.getWithdrawalByID);
//
// //transfer
const transferController = new TransferController();
router.post('/wallets/:id/transfers', auth, transferController.makeTransfer);
// router.get('/wallets/:id/transfers', transferController.getAllTransfers);
// router.get('/wallets/:wallet_id/transfers/:id', transferController.getTransferByID);

module.exports = router;