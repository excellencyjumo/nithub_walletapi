const { transports, createLogger } = require('winston');


const options = {
    file: {
        level: 'error',
        filename: 'error.txt',
        dirname: './src/logs',
        datetime: 'YYYY-MM-DD',
        colorize: false,
        handleExceptions: true,
        handleRejections: true,
    },

    console: {
        level: 'debug',
        colorize: true,
        handleExceptions: true
    }
}

const logger = createLogger({
    transports: [
        new transports.File(options.file),
        new transports.Console(options.console),
    ],
    exitOnError: false
});

module.exports = logger;