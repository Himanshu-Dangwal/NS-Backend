const express = require('express');
const app = express();
const router = require('../routes/productRoutes');
const router1 = require('../routes/checkoutRoutes');

app.use(express.json());

app.use('/api/v1/cart', router);
app.use('/api/v1', router1);

module.exports = app;
