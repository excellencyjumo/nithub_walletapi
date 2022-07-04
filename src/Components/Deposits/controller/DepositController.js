const Wallet = require("../../Wallets/models/Wallet");
const Deposit = require("../models/Deposit");
const {sendResponse} = require("../../../utils/utils");
const logger = require('../../../config/winston')

class DepositController {

    async makeDeposit(req, res) {

        const { id } = req.params;
        const { amount } = req.body;

        try{

            let wallet = await Wallet.findById(id);
            if (!wallet)return sendResponse(res, 404, "Wallet not found", {});

            const deposit = new Deposit(amount, wallet.id);
            await deposit.save();

            wallet.amount = parseFloat(wallet.amount) +  amount;
            wallet = await wallet.updateById();

            sendResponse(res, 201,"Deposit made", wallet);

        }catch (err){
            console.log(err);
            sendResponse(res, 500, "An error occurred", {});
        }
    }

    async getAllDeposits(req, res) {
        const { id } = req.params;

        try{
            const deposits = await Deposit.getWalletDeposits(id);
            if (!deposits) return sendResponse(res, 404, "You have not made any deposit to this wallet");
            sendResponse(res, 200, "Here you go", deposits);
        }catch (e){
            logger.error(e.message, e);
            sendResponse(res, 500, "An error occurred");
        }

    }

    async getDepositByID(req, res) {
        const { walletID, id: depositID } = req.params;

        try{
            const deposit = await Deposit.getDeposit(walletID, depositID);
            if (!deposit) return sendResponse(res, 404, "No such deposit found");
            sendResponse(res, 200, "Here you go.", deposit);
        }catch (e){
            logger.error(e.message, e);
            sendResponse(res, 500, "An error occurred");
        }
    }


}

module.exports = DepositController;