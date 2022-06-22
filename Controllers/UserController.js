const User = require('../Models/User') 
const Wallet = require("../Models/Wallet")
const {users} =require('../database/data')
const { sendResponse } = require('../utils');

class UserController{
    constructor(){}

    createUser(req,res){
        const body = req.body;
        const existingUser = User.findByFirstName(body.firstname);
        if (existingUser) {
            sendResponse(res, 400, 'Firstname already exists');
            return;
        }
        const newUser = new User(body.firstName,body.lastName,body.email)
        users.push(newUser);
        res.status(201).json({
            status:201,
            data:newUser,
        })
        sendResponse(res, 201, newUser.toJSON());
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