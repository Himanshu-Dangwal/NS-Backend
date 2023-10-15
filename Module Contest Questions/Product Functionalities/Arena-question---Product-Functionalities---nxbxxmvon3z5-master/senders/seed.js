const Product = require('../models/productModel');

const products = [
  {
    name: 'Product 1',
    price: 50,
  },
  {
    name: 'Product 2',
    price: 30,
  },
  {
    name: 'Product 3',
    price: 40,
  },
  {
    name: 'Product 4',
    price: 25,
  },
  {
    name: 'Product 5',
    price: 60,
  },
];

// for (let i = 3; i <= 22; i++) {
//   products.push({
//     name: `Product ${i}`,
//     price: Math.floor(Math.random() * 100) + 1,
//     quantity: i % 2 === 0 ? 2 : 3,
//   });
// }

const seedProducts = async () => {
  try {
    await Product.create(products);
    console.log('Seed: Initial data seeded successfully');
  } catch (error) {
    console.error('Seed: Error seeding initial data:', error);
  }
};

module.exports = seedProducts;
