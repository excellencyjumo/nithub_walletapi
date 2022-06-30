const Wallet = require("../Models/Wallet");
const Deposit = require("../Models/Deposit");
const {sendResponse} = require("../utils");

class DepositController {

    async makeDeposit(req, res){

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
}

module.exports = DepositController;