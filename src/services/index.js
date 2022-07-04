const {exchangeRatesAPIKey} = require('../config');
const axios = require('axios')

const converter = {

    requestOptions: {
        method: 'GET',
        redirect: 'follow',
        headers: {
            apiKey: exchangeRatesAPIKey,
        }
    },

    getConversion: async (from, to, amount) => {

        const url = `https://api.apilayer.com/exchangerates_data/convert?to=${to}&from=${from}&amount=${amount}`;
        const response = await axios({
            method: "GET",
            url,
            responseType: 'json',
            headers: {
                apiKey: exchangeRatesAPIKey
            }
        });


        if (response.status !== 200) return null;

        const {info, result: value } = response.data;

        return {info, value};
    },

}


module.exports = converter;