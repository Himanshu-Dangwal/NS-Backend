const Product = require('../models/productModel');

const paginate = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  try {
    const products = await Product.find()
      .skip((page - 1) * limit)
      .limit(limit);

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

const sort = async (req, res) => {
  const { sort } = req.query;
  const sortOptions = {};

  if (sort) {
    sortOptions.price = sort === 'asc' ? 1 : -1;
  }

  try {
    const products = await Product.find().sort(sortOptions);

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

const filter = async (req, res) => {
  const { category } = req.query;
  const filterOptions = {};

  if (category) {
    filterOptions.category = category;
  }

  try {
    const products = await Product.find(filterOptions);

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  paginate,
  sort,
  filter,
};
