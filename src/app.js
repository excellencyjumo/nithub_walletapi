const express = require("express");
const helmet = require('helmet');
const router = require("./Components");

const app = express();

app.use(helmet());
app.use(express.json());
app.use(router);

app.use((req, _res, next) => {next(new Error(`Could not handle request to ${req.url}`));});

app.use((err, _req, res, _next) => {res.status(404).json({status: 404,message: err.toString(),});});

module.exports = app;