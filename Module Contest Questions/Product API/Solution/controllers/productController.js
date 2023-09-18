const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data', '/data.json');

const getAllProducts = (req, res) => {
  fs.readFile(productsFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
      return;
    }

    const products = JSON.parse(data);
    res.status(200).json(products);
  });
};

const getProductById = (req, res) => {
  const productId = parseInt(req.params.id);

  fs.readFile(productsFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
      return;
    }

    const products = JSON.parse(data);
    const product = products.find((prod) => prod.id === productId);

    if (!product) {
      res.status(404).json({ message: 'Product not found' });
      return;
    }

    res.status(200).json(product);
  });
};

const createProduct = (req, res) => {
  const { name, price } = req.body;

  fs.readFile(productsFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
      return;
    }

    const products = JSON.parse(data);
    const newProduct = {
      id: generateProductId(products),
      name,
      price,
    };
    products.push(newProduct);

    fs.writeFile(productsFilePath, JSON.stringify(products), (err) => {
      if (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
        return;
      }

      res.status(201).json({ message: 'Product created', product: newProduct });
    });
  });
};

const updateProduct = (req, res) => {
  const productId = parseInt(req.params.id);
  const { name, price } = req.body;

  fs.readFile(productsFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
      return;
    }

    let products = JSON.parse(data);
    const productIndex = products.findIndex((prod) => prod.id === productId);

    if (productIndex === -1) {
      res.status(404).json({ message: 'Product not found' });
      return;
    }

    products[productIndex] = {
      ...products[productIndex],
      name,
      price,
    };

    fs.writeFile(productsFilePath, JSON.stringify(products), (err) => {
      if (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
        return;
      }

      res.status(200).json({
        message: 'Product updated',
        product: products[productIndex],
      });
    });
  });
};

const deleteProduct = (req, res) => {
  const productId = parseInt(req.params.id);

  fs.readFile(productsFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
      return;
    }

    let products = JSON.parse(data);
    const productIndex = products.findIndex((prod) => prod.id === productId);

    if (productIndex === -1) {
      res.status(404).json({ message: 'Product not found' });
      return;
    }

    const deletedProduct = products.splice(productIndex, 1);

    fs.writeFile(productsFilePath, JSON.stringify(products), (err) => {
      if (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
        return;
      }

      res
        .status(200)
        .json({ message: 'Product deleted', product: deletedProduct });
    });
  });
};

const generateProductId = (products) => {
  const maxId = products.reduce(
    (max, prod) => (prod.id > max ? prod.id : max),
    0
  );
  return maxId + 1;
};

module.exports = {
  getAllProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
};
