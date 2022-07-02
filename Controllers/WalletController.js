const Wallet = require('../Models/Wallet');
const { sendResponse } = require('../utils');

class WalletController {
  constructor() {}

  async createWallet(req, res) {
    const user = req.user;

    const { currency } = req.body;

    try{
      let wallet = new Wallet(currency, user.id);

      wallet = await wallet.save();

      sendResponse(res, 201, "Here you go", wallet);
    }catch (err){
      console.log(err);
      sendResponse(res, 500, "An error occurred try again", {});
    }

  }

  async getAllWallets(req, res) {
    const user = req.user;

    try{
      const wallets = await Wallet.findByUserId(user.id);
      if (!wallets) return sendResponse(res, 404, "You have no wallet", {});

      sendResponse(res, 200, "Here you go.", wallets);
    }catch (e) {
      console.log(e);
      sendResponse(res, 500, "An error occurred", {});
    }
  }

  async getWalletByID(req, res) {
    const id = req.params.id;
    const user = req.user;

    if (user.id !== id) return sendResponse(res, 404, `Wallet with id ${id} not found`);


    try{
      const wallet = await Wallet.findById(id);
      if (!wallet) return sendResponse(res, 404, `Wallet with id ${id} does not exist`,{});
      sendResponse(res, 200, "Here you go", wallet);
    }catch(e){
      console.log(e);
      sendResponse(res, 500, "An error occurred",{});
    }

  }

  async deleteWallet(req, res) {
    const { id } = req.params;
    const user = req.user;

    if (user.id !== id) return sendResponse(res, 404, `Wallet with id ${id} not found`);


    try{
      const isSuccessful = await Wallet.deleteByID(id);
      if (!isSuccessful) return sendResponse(res, 404, `Wallet with id ${id} does not exists`);
      sendResponse(res, 200, "Wallet deleted successfully", {});
    }catch (e){
      console.log(e);
      sendResponse(res, 500, "An error occurred", {});
    }
  }

}

module.exports = WalletController;