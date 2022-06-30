const User = require('../Models/User');
const { sendResponse} = require('../utils');
const { hash } = require('bcrypt');
const Wallet = require("../Models/Wallet");

class UserController{
    constructor(){}

    async createUser(req,res){
        const { firstName, lastName, email, password } = req.body;

        try{
            const userExists = await User.findByFirstName(firstName);

            if (userExists) {
                sendResponse(res, 400, 'Firstname already exists', {});
                return;
            }

            const hashPassword = await hash(password, 11);

            let user = new User(firstName, lastName, email, hashPassword);

            const result = await user.save();

            user = result[0];

            const token = await user.generateAuthToken();

            res.header('x-auth-token', token);

            sendResponse(res, 201,"Registration successful", user.toJSON());
        }catch (e) {
            console.log(e);
            sendResponse(res, 500, "An error occurred while creating user", {});
        }
    }

    async loginUser(req, res) {

      const { email, password } = req.body;

      let user = await User.getByEmail(email);
      if (!user){
          sendResponse(res, 404, "User is not authenticated", {});
          return;
      }

      user = user[0];

      const isValid = await user.comparePassword(password);
      if (!isValid){
          sendResponse(res, 400, "Invalid email or password", {});
          return;
      }

      const token = await user.generateAuthToken();
      res.header('x-auth-token', token);

      sendResponse(res, 200, "Here you go", user.toJSON())
    }
    
      getAllWallets(req, res) {
        const { userID } = req.body;
    
        const user = User.getByID(+userID);
        if (user) {
          sendResponse(
            200, 
            'Wallets accredited to this user found', 
            user.wallets.map((walletID) => {
              return Wallet.getByID(walletID);
            })
          );
        } else {
          sendResponse(404, 'User not found');
        }
      }
    
      deleteWallet(req, res) {
        const { walletId } = req.params;
        const {userId} = req.body;

        const user = User.getByID(+userId);
        if (!user){
          sendResponse(404, 'User not found');
          return;
        }
    
        const wallet = Wallet.getByID(+walletId);
        if (!wallet) {
          sendResponse(404, 'Wallet not found');
          return;
        }
    
        Wallet.deleteByID(+walletId);
    
        sendResponse(res, 200, 'Course was deleted successfully');
      }
    }

module.exports=UserController;