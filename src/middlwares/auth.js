const {sendResponse, verifyAuthToken} = require("../utils/utils");
const User = require("../Components/Users/model/User");

async function auth (req, res, next){
    try{

        const token = req.header('x-auth-token');
        if (!token) {
            sendResponse(res, 401, "Access denied", {});
            return;
        }

        const { id } = await verifyAuthToken(token);

        const user = await User.findById(id);

        if (!user){
            sendResponse(res, 403, "Unable to perform action", {});
            return;
        }

        req.user = user[0];

        next();


    }catch (err){
        sendResponse(res, 422, "Invalid token provided", {});
    }

}

module.exports = auth;
