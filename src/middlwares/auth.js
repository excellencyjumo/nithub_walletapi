const {sendResponse, verifyAuthToken} = require("../utils/utils");
const User = require("../Components/Users/model/User");
const logger = require("../config/winston");

async function auth (req, res, next){
    try{

        const token = req.header('x-auth-token');
        if (!token) return sendResponse(res, 401, "Access denied");

        const { id } = await verifyAuthToken(token);

        const user = await User.findById(id);
        if (!user) return sendResponse(res, 403, "Unable to perform action");

        req.user = user[0];

        next();

    }catch (e){
        logger.error(e.message, e);
        sendResponse(res, 422, "Invalid token provided");
    }

}

module.exports = auth;
