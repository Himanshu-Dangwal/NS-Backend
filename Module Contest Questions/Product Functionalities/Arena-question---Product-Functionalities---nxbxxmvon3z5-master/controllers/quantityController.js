const Product = require('../models/productModel');

// Get all products from the database
const getAllProduct = async (req, res) => {
  try {
    // TODO: Fetch all products from the database
    // const products = await Product.find();
    // TODO: Send the products as a JSON response
    // res.status(200).json(products);
  } catch (error) {
    // Handle any errors and send an error response
    // res.status(500).json({ error: error.message });
  }
};

// Add a product to the cart
const addQuantity = async (req, res) => {
  const { productId } = req.params;

  try {
    // TODO: Fetch the product by ID
    // const product = await Product.findById(productId);
    // TODO: Increase the product's quantity by 1
    // product.quantity += 1;
    // await product.save();
    // TODO: Send a success response
    // res.status(200).json({ message: 'Product quantity increased', product });
  } catch (error) {
    // Handle any errors and send an error response
    // res.status(500).json({ message: 'Internal server error', error });
  }
};

// Remove a product from the cart
const removeQuantity = async (req, res) => {
  const { productId } = req.params;

  try {
    // TODO: Fetch the product by ID
    // const product = await Product.findById(productId);
    // TODO: Decrease the product's quantity by 1 (if it's greater than 0)
    // if (product.quantity > 0) {
    //   product.quantity -= 1;
    //   await product.save();
    // }
    // TODO: Send a success response
    // res.status(200).json({ message: 'Product quantity removed', product });
  } catch (error) {
    // Handle any errors and send an error response
    // res.status(500).json({ message: 'Internal server error', error });
  }
};

// Update the quantity of a product in the cart
const updateQuantity = async (req, res) => {
  const { productId } = req.params;
  const { newQuantity } = req.body;

  try {
    // TODO: Fetch the product by ID
    // const product = await Product.findById(productId);
    // TODO: Update the product's quantity to the new quantity
    // product.quantity = newQuantity;
    // await product.save();
    // TODO: Send a success response
    // res.status(200).json({ message: 'Product quantity updated', product });
  } catch (error) {
    // Handle any errors and send an error response
    // res.status(500).json({ message: 'Internal server error', error });
  }
};

module.exports = {
  addQuantity,
  removeQuantity,
  updateQuantity,
  getAllProduct,
};
