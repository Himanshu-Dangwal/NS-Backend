const Product = require('../models/productModel');
// get all product from a db
const getAllProduct = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(201).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// Add a product to the cart
const addQuantity = async (req, res) => {
  const { productId } = req.params;

  try {
    // Fetch the product by ID
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    product.quantity += 1;
    await product.save();

    return res
      .status(200)
      .json({ message: 'Product quantity increased', product });
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error', error });
  }
};

const removeQuantity = async (req, res) => {
  const { productId } = req.params;

  try {
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    if (product.quantity > 0) {
      product.quantity -= 1;
      await product.save();
    }

    return res
      .status(200)
      .json({ message: 'Product quantity removed', product });
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error', error });
  }
};

const updateQuantity = async (req, res) => {
  const { productId } = req.params;
  const { newQuantity } = req.body;

  try {
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    product.quantity = newQuantity;
    await product.save();

    return res
      .status(200)
      .json({ message: 'Product quantity updated', product });
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error', error });
  }
};

module.exports = {
  addQuantity,
  removeQuantity,
  updateQuantity,
  getAllProduct,
};
