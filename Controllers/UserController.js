const User = require('../Models/User');
const { sendResponse } = require('../utils');
const { hash } = require('bcrypt');

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

            await user.generateAuthToken();

            sendResponse(res, 201,"Registration successful", user.toJSON());
        }catch (e) {
            console.log(e);
            sendResponse(res, 500, "An error occurred while creating user", {});
        }
    }

    loginUser(req, res) {
      const { email, password } = req.body;
  
      const user = User.getByEmail(email);
      if (user) {
        sendResponse(res, 200, 'User was found', user.toJSON());
      } else {
        sendResponse(res, 404, `User with id "${id}" was not found`);
      }
    }
    createWallet(req, res) {
        const { userId , walletId } = req.body;
        const user = User.getByID(+userId);
        if (user) {
          const currency = Wallet.getByID(+walletId);
          if (!currency) {
            sendResponse(res, 404, "Wallet hasn't been created for use yet");
            return;
          }
    
          const hasCurrencyWallet = user.wallets.includes(currency);
          if (hasCurrencyWallet) {
            sendResponse(422, 'User cant have duplicate currency account');
          } else {
            user.currency.push(currency);
            sendResponse(200, 'Wallet was registered successfully');
          }
        } else {
          sendResponse(404, 'User does not exist');
        }
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