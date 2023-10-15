const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  //name will be a string with required true
  //price will be a Number with required true
  // quantity will be a number with required true
});

module.exports = mongoose.model('Product', productSchema);
