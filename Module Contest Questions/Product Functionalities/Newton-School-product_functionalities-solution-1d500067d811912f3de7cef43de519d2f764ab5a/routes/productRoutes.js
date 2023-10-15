const express = require('express');
const router = express.Router();
const {
  addQuantity,
  getAllProduct,
  removeQuantity,
  updateQuantity,
} = require('../controllers/quantityController');

router.post('/add/:productId', addQuantity);

router.delete('/remove/:productId', removeQuantity);

router.put('/update/:productId', updateQuantity);

router.get('/products', getAllProduct);

module.exports = router;
