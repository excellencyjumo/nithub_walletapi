const { JWT } = require('../config')
const { verify } = require('jsonwebtoken');
exports.sendResponse = (res, status, message, data) => {
    res.status(status).json({
      status,
      message,
      data
    });
  };

exports.verifyAuthToken = (token) => {
    return verify(token, JWT.ACCESS_TOKEN_SECRET);
}