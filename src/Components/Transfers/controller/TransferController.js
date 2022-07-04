const Wallet = require("../../Wallets/models/Wallet");
const {sendResponse} = require("../../../utils/utils");
const { getConversion } = require('../../../services');
const Transfer = require("../models/Transfer");
const logger = require("../../../config/winston");

class TransferController {

    async makeTransfer(req, res) {

        const { id } = req.params;
        let { amount, destination } = req.body;

        try {

            let sourceWallet = await Wallet.findById(id);
            if (!sourceWallet) return sendResponse(res, 404, "Wallet is not available", {});

            let currentBalance = sourceWallet.amount;
            if (currentBalance < amount) return sendResponse(res, 400, "Insufficient balance", {});

            const destinationWallet = await Wallet.findById(destination);
            if (!destinationWallet) return sendResponse(res, 404, "Wallet is not available", {});

            const response = destinationWallet.currency !== sourceWallet.currency
                            ? await getConversion(sourceWallet.currency, destinationWallet.currency, +amount)
                            : "";

            // if the response is of type object (when the two participating
            // wallets are of different currencies)
            let conversionRate;
            let convertedAmount;
            if(typeof response === "object"){
                conversionRate = response.info.rate;
                convertedAmount = response.value;
            }else{
                conversionRate = 1;
                convertedAmount = +amount;
            }

            const transfer = new Transfer(convertedAmount, conversionRate , sourceWallet, destinationWallet);
            await transfer.save();

            logger.info('Transaction saved')

            destinationWallet.amount = parseFloat(destinationWallet.amount) + convertedAmount;
            await destinationWallet.updateById();

            logger.info('Destination wallet credited')

            currentBalance -= amount;
            sourceWallet.amount = currentBalance;
            sourceWallet = await sourceWallet.updateById();

            logger.info('Source wallet debited');

            sendResponse(res, 201, "Transfer successful", sourceWallet);
        }catch (e){
            logger.error(e.message, e);
            sendResponse(res, 500, "An error occurred", {});
        }
    }

    async getAllTransfers(req, res) {
        const { id: walletID } = req.params;

        try{
            const transfer = await Transfer.getWalletTransfers(walletID);
            if (!transfer) return sendResponse(res, 404, "No transfer has been done through this wallet");
            sendResponse(res, 200, "Here you go.", transfer);
        }catch (e){
            logger.error(e.message, e);
            sendResponse(res, 500, "An error occurred");
        }
    }

    async getTransfer(req, res) {
        const { walletID, id: transferID } = req.params;

        try{
            const transfer = await Transfer.getTransferByID(walletID, transferID);
            if (!transfer) return sendResponse(res, 404, "No such transfer has been made to this wallet");
            sendResponse(res, 200, "Here you go.", transfer);
        }catch (e){
            logger.error(e.message, e);
            sendResponse(res, 500, "An error occurred");
        }
    }
}

module.exports = TransferController;