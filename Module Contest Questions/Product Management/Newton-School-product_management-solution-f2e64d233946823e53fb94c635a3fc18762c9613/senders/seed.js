const Product = require('../models/productModel');

const products = [
  {
    name: 'Product 1',
    price: 50,
    category: 'Electronics',
    availability: true,
  },
  {
    name: 'Product 2',
    price: 30,
    category: 'Clothing',
    availability: false,
  },
  {
    name: 'Product 3',
    price: 40,
    category: 'Electronics',
    availability: true,
  },
  {
    name: 'Product 4',
    price: 25,
    category: 'Toys',
    availability: true,
  },
  {
    name: 'Product 5',
    price: 60,
    category: 'Electronics',
    availability: true,
  },
];

for (let i = 3; i <= 22; i++) {
  products.push({
    name: `Product ${i}`,
    price: Math.floor(Math.random() * 100) + 1,
    category: i % 2 === 0 ? 'Electronics' : 'Clothing',
    availability: i % 3 === 0 ? false : true,
  });
}

const seedProducts = async () => {
  try {
    await Product.create(products);
    console.log('Seed: Initial data seeded successfully');
  } catch (error) {
    console.error('Seed: Error seeding initial data:', error);
  }
};

module.exports = seedProducts;
