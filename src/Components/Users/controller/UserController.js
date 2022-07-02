const logger = require('../../../config/winston');
const User = require('../model/User');
const { sendResponse} = require('../../../utils/utils');
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

            logger.info('User created');

            const result = await user.save();

            user = result[0];

            const token = await user.generateAuthToken();

            logger.info('Access tokens generated')

            res.header('x-auth-token', token);

            sendResponse(res, 201,"Registration successful", user.toJSON());
        }catch (e) {
            logger.error(e.message, e);
            sendResponse(res, 500, "An error occurred while creating user", {});
        }
    }

    async loginUser(req, res) {

        const { email, password } = req.body;

        try{
            let user = await User.getByEmail(email);
            if (!user) {
                sendResponse(res, 404, "User is not authenticated", {});
                return;
            }

            user = user[0];

            const isValid = await user.comparePassword(password);
            if (!isValid) {
                sendResponse(res, 400, "Invalid email or password", {});
                return;
            }

            const token = await user.generateAuthToken();
            res.header('x-auth-token', token);

            logger.info('Access token generated and set into the response header');

            sendResponse(res, 200, "Here you go", user.toJSON())
        }catch (e) {
            logger.error(e.message, e);
            sendResponse(res, 500, "An error occurred");
        }
    }


    }

module.exports=UserController;