const Wallet = require("../Models/Wallet");
const {sendResponse} = require("../utils");
const Withdrawal = require("../Models/Withdrawal");

class WithdrawController {

    async makeWithdrawal(req, res) {

        const { id } = req.params;
        const { amount } = req.body;

        try{
            let wallet = await Wallet.findById(id);
            console.log(wallet);
            if (!wallet) return sendResponse(res, 404, "Wallet is not available", {});

            let walletBalance = parseFloat(wallet.amount)
            if (walletBalance < amount) return sendResponse(res, 400, "Insufficient balance", {});

            const withdrawal = new Withdrawal(amount, wallet.id);
            await withdrawal.save();

            walletBalance = walletBalance - amount;
            wallet.amount = walletBalance;
            await wallet.updateById();

            sendResponse(res, 201, "Withdrawal successful", wallet);

        }catch (err){
            console.log(err);
            sendResponse(res, 500, "An error occurred", {});
        }

    }
}

module.exports = WithdrawController;