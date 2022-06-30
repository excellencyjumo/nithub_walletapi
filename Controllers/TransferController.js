const Wallet = require("../Models/Wallet");
const {sendResponse} = require("../utils");
const { getConversion } = require('../services');
const Transfer = require("../Models/Transfer");

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

            let {conversionRate, convertedAmount} = typeof response === 'object'
                ? { conversionRate: response.info.rate,  convertedAmount: response.value }
                : { conversionRate: 1, convertedAmount: +amount };


            const transfer = new Transfer(convertedAmount, conversionRate , sourceWallet, destinationWallet);
            await transfer.save();

            destinationWallet.amount = parseFloat(destinationWallet.amount) + convertedAmount;
            await destinationWallet.updateById();

            currentBalance -= amount;
            sourceWallet.amount = currentBalance;
            sourceWallet = await sourceWallet.updateById();

            sendResponse(res, 201, "Transfer successful", sourceWallet);
        }catch (err){
            console.log(err);
            sendResponse(res, 500, "An error occurred", {});
        }
    }
}

module.exports = TransferController;