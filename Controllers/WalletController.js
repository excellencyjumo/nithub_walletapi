const Wallet = require('../Models/Wallet');
const { sendResponse } = require('../utils');

class WalletController {
  constructor() {}

  async createWallet(req, res) {
    const { currency } = req.body;
    try {
      const newWallet = await Wallet.create(currency);
      sendResponse(res, 201, "Wallet was created successfully", newWallet.toJSON());
    } catch (err) {
      sendResponse(res, 500, "An error occured while creating a new wallet");
    }
  }

  // /courses/:id -> /courses/44
  async getWalletByCurrency(req, res) {
    const { currency } = req.params;

    try {
      const wallet = await Wallet.getByID(+id);

      if (!wallet) {
        sendResponse(res, 404, `Wallet with currency "${currency}" was not found`);
        return;
      }
      sendResponse(res, 200, "Wallet found", wallet.toJSON());
    } catch (err) {
      sendResponse(res, 500, "An error occured while creating a new wallet");
    }
  }

  async getAllCourses(req, res) {
    try {
      const wallets = await Wallet.getAll();
      sendResponse(res, 200, "Courses fetched", wallets.map(wallet => wallet.toJSON()));
    } catch (err) {
      sendResponse(res, 500, "An error occured while fetching wallets");
    }
  }

  deleteCourseByCurrency(req, res) {
    const { currency } = req.params;

    const existing = Wallet.getByCurrency(currency);

    if (existing) {
      Wallet.deleteByCurrency(currency);

      res.status(200).json({
        status: 200,
        message: 'Wallet was deleted successfully'
      });
    } else {
      res.status(404).json({
        status: 404,
        message: 'Wallet was not found',
      });
    }
  }
}

module.exports = WalletController;