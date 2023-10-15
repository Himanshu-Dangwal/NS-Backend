const Product = require('../models/productModel');

const processCheckout = async (req, res) => {
  try {
    // Fetch all products
    const products = await Product.find();

    if (!products || products.length === 0) {
      return res.status(404).json({ message: 'No products found' });
    }

    let shouldProceedToCheckout = false;

    for (const product of products) {
      // Check if quantity is less than or equal to 1 after adding quantity
      if (product.quantity + 1 > 1) {
        shouldProceedToCheckout = true;
        break;
      }
    }

    if (!shouldProceedToCheckout) {
      return res.status(400).json({
        message: 'No products with quantity > 1. Cannot proceed to checkout.',
      });
    }

    // Calculate the total cost
    let totalCost = 0;

    for (const product of products) {
      // Consider your pricing logic, for simplicity, let's assume price * quantity
      totalCost += product.price * product.quantity;
    }

    // Apply discount if total cost is more than 100
    if (totalCost > 100) {
      const discountAmount = 0.2 * totalCost; // 20% discount
      totalCost -= discountAmount;
    }

    // For simplicity, we'll respond with a payment confirmation
    return res.status(200).json({
      message: 'Payment successful',
      totalCost,
      products,
    });
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error', error });
  }
};

module.exports = {
  processCheckout,
};
