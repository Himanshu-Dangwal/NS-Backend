const express = require('express')
const app = express()
const bodyParser = require("body-parser");


// Parse JSON bodies (as sent by API clients)
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

module.exports = app;
