const express = require('express');
const { connectToDB } = require('./database');
const { PORT } = require('./config')
const app = require('./app');

const server = express();

server.use(app);

connectToDB()
    .then(() => {

      console.log("Database connection established");
      server.listen(PORT, () => {
        console.log('server running on port %s', PORT);
      });

    })
    .catch(err => {
      console.log(err);
      process.exit(1);
    })