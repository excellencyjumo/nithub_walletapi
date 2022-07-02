const Wallet = require("../../Wallets/models/Wallet");
const {sendResponse} = require("../../../utils/utils");
const Withdrawal = require("../models/Withdrawal");
const logger = require('../../../config/winston');

class WithdrawController {

    async makeWithdrawal(req, res) {

        const { id } = req.params;
        const { amount: amountToBeWithdrawn } = req.body;

        try{

            let wallet = await Wallet.findById(id);
            if (!wallet) return sendResponse(res, 404, "Wallet is not available");

            let walletBalance = parseFloat(wallet.amount)
            if (walletBalance < amountToBeWithdrawn) return sendResponse(res, 400, "Insufficient balance");

            const withdrawal = new Withdrawal(amountToBeWithdrawn, wallet.id);
            await withdrawal.save();

            logger.info('Withdrawal save');

            walletBalance -= amountToBeWithdrawn;
            wallet.amount = walletBalance;
            await wallet.updateById();

            logger.info('Wallet debited successfully');

            sendResponse(res, 201, "Withdrawal successful", wallet);

        }catch (e){
            logger.error(e.message, e);
            sendResponse(res, 500, "An error occurred");
        }

    }

    async getAllWithdrawals(req, res) {
        const { id: walletID } = req.params;

        try{
            const deposits = await Withdrawal.getWalletWithdrawals(walletID);
            if (!deposits) return sendResponse(res, 404, "No withdrawal transaction has occurred in this wallet");
            sendResponse(res, 200,"Here you go", deposits);
        }catch (e){
            logger.error(e.message, e);
            sendResponse(res, 500, "An error occurred");
        }
    }

    async getWithdrawal(req, res) {
        const { walletID, id: withdrawalID } = req.params;

        try{
            const withdrawal = await Withdrawal.getWithdrawalByID(walletID, withdrawalID);
            if (!withdrawal) return sendResponse(res, 404, "No such transaction found");
            sendResponse(res, 200, "Here you go", withdrawal);
        }catch (e){
            logger.error(e.message, e);
            sendResponse(res, 500, "An error occurred");
        }
    }
}

module.exports = WithdrawController;