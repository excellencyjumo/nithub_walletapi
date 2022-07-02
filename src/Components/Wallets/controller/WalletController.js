const Wallet = require('../models/Wallet');
const { sendResponse } = require('../../../utils/utils');
const Deposit = require("../../Deposits/models/Deposit");
const Withdrawal = require("../../Withdrawals/models/Withdrawal");
const Transfer = require("../../Transfers/models/Transfer");
const logger = require("../../../config/winston");

class WalletController {

  async createWallet(req, res) {
    const user = req.user;

    const { currency } = req.body;

    try{
      let wallet = new Wallet(currency, user.id);
      wallet = await wallet.save();

      logger.info('Wallet created');

      sendResponse(res, 201, "Here you go", wallet);
    }catch (e){
      logger.error(e.message, e);
      sendResponse(res, 500, "An error occurred try again", );
    }

  }

  async getAllWallets(req, res) {
    const user = req.user;

    try{
      const wallets = await Wallet.findByUserId(user.id);
      if (!wallets) return sendResponse(res, 404, "You have no wallet");

      sendResponse(res, 200, "Here you go.", wallets);
    }catch (e) {
      logger.error(e.message, e);
      sendResponse(res, 500, "An error occurred");
    }
  }

  async getWalletByID(req, res) {
    const id = req.params.id;

    try{
      const wallet = await Wallet.findById(id);
      if (!wallet) return sendResponse(res, 404, `Wallet with id ${id} does not exist`,{});

      sendResponse(res, 200, "Here you go", wallet);
    }catch(e){
      logger.error(e.message, e);
      sendResponse(res, 500, "An error occurred");
    }

  }

  async deleteWallet(req, res) {
    const { id } = req.params;

    try{
      const isSuccessful = await Wallet.deleteByID(id);
      if (!isSuccessful) return sendResponse(res, 404, `Wallet with id ${id} does not exists`);

      sendResponse(res, 200, "Wallet deleted successfully");
    }catch (e){
      logger.error(e.message, e);
      sendResponse(res, 500, "An error occurred");
    }
  }

  async getTransactions(req,res) {
    const { id } = req.params;

    const transactions = {};

    try{
      transactions.deposits = await Deposit.getWalletDeposits(id) ?? "No deposits has been made";
      transactions.withdraws = await Withdrawal.getWalletWithdrawals(id) ?? "No withdrawal has been made";
      transactions.transfers = await Transfer.getWalletTransfers(id) ?? "No transfer has been made";

      logger.info("User's transactions fetched");

      sendResponse(res, 200, "Here you go.", [transactions]);
    }catch (e){
      logger.error(e.message, e);
      sendResponse(res, 500, "An error occurred.");
    }
  }

  // async getTransactionsAsPDF(req, res) {
  //   const { id } = req.params;
  //
  //   const transactions = {};
  //
  //   // work on the pdf service later
  //
  //   try{
  //     transactions.deposits = await Deposit.getWalletDeposits(id) ?? "No deposits has been made";
  //     transactions.withdraws = await Withdrawal.getWalletWithdrawals(id) ?? "No withdrawal has been made";
  //     transactions.transfers = await Transfer.getWalletTransfers(id) ?? "No transfer has been made";
  //     sendResponse(res, 200, "Here you go.", [transactions]);
  //   }catch (e){
  //     console.log(e);
  //     sendResponse(res, 500, "An error occurred.");
  //   }
  // }

}

module.exports = WalletController;