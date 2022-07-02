const dotenv = require('dotenv');

dotenv.config();

const config = {
    db: {
        name: process.env.DB_NAME,
        user: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        host: process.env.DB_HOST_NAME,
        port: process.env.DB_PORT
    },

    JWT: {
        ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
        tokenLifeSpan: process.env.ACCESS_TOKEN_LIFETIME
    },

    exchangeRatesAPIKey: process.env.EXCHANGE_RATES_API_KEY,

    PORT: process.env.SERVER_PORT || 8080

}

module.exports = config;