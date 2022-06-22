const express = require('express');
const UserController = require('./Controllers/UserController');
const WalletController = require('./Controllers/WalletController');
const DepositController = require('./Controllers/DepositController.js');
const WithdrawController = require('./Controllers/WithdrawController.js');
const TransferController = require('./Controllers/TransferController.js');

const router = express.Router();

router.get('/ping', (req, res) => {
  res.status(200).json({
    status: 200,
    message: 'Pong!'
  });
});

// users
const userController = new UserController();
router.post('/auth/users', userController.createUser);
router.get('/auth/users/login',userController.loginUser);
router.get('/users/:userID/wallets', userController.getAllWallets);
router.put('/users/:userID/wallets', userController.createWallet);
router.delete('/users/:userID/wallets/:walletID', userController.deleteWallet);

// wallets
const walletController = new WalletController();
router.post('/wallets', walletController.createWallet);
router.get('/wallets', walletController.getAllWallets);
router.get('/wallets/:id', walletController.getWalletByID);
router.delete('/wallets/:id', walletController.deleteWalletByID);
router.get('/wallets/:id/transactions/download',walletController.getTransactions)

//deposit
const depositController = new DepositController();
router.post('/wallets/:id/deposits', depositController.makeDeposit);
router.get('/wallets/:id/deposits', depositController.getAllDeposits);
router.get('/wallets/:wallet_id/deposits/:id', depositController.getDepositByID);

//withdraw
const withdrawController = new WithdrawController();
router.post('/wallets/:id/withdrawals', withdrawController.withdrawal);
router.get('/wallets/:id/withdrawals', withdrawController.getAllWithdrawals);
router.get('/wallets/:wallet_id/withdrawals/:id', withdrawController.getWithdrawalByID);

//transfer
const transferController = new TransferController();
router.post('/wallets/:id/transfers', transferController.makeTransfer);
router.get('/wallets/:id/transfers', transferController.getAllTransfers);
router.get('/wallets/:wallet_id/transfers/:id', transferController.getTransferByID);


module.exports = router;