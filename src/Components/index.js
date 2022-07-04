const { Router } = require('express');
const userRouter = require('./Users/router')
const walletRouter = require('./Wallets/routes')
const withdrawalRouter = require('./Withdrawals/routes')
const transferRouter = require('./Transfers/routes')
const depositRouter = require('./Deposits/routes')

const router = Router();

router.use(userRouter);
router.use(walletRouter);
router.use(depositRouter);
router.use(withdrawalRouter);
router.use(transferRouter);

module.exports = router;