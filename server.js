const express = require('express');
const { connectToDB } = require('./database');
const router = require('./routes');

const server = express();

server.use(express.json());
server.use(router);

server.use((req, _res, next) => {next(new Error(`Could not handle request to ${req.url}`));});

server.use((err, _req, res, _next) => {res.status(404).json({status: 404,message: err.toString(),});});

const port = 8080;

connectToDB()
    .then(() => {
      console.log("Database connection established");
      server.listen(port, () => {
        console.log('server running on port %s', port);
      });
    })
    .catch(err => {
      console.log(err);
      process.exit(1);
    })