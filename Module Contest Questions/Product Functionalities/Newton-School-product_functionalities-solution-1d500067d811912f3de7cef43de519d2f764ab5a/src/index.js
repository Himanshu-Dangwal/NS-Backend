const app = require('./app');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const seedProduct = require('../senders/seed');
const Product = require('../models/productModel');

dotenv.config();

mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);

let dbConnection;

const connectToDatabase = async () => {
  try {
    dbConnection = await mongoose.connect(process.env.DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to DB');
    // Seed the database
    await seedProduct();
  } catch (error) {
    console.error('Error connecting to database:', error.message);
    process.exit(1);
  }
};

const disconnectFromDatabase = async () => {
  try {
    // Clear the database (replace this with your actual clearing logic)
    await Product.deleteMany({});

    // Disconnect from the database
    await mongoose.disconnect();
    console.log('Disconnected from DB');
  } catch (error) {
    console.error('Error disconnecting from database:', error.message);
  }
};

// Listen for app termination and disconnect from the database
process.on('SIGINT', async () => {
  await disconnectFromDatabase();
  process.exit(0);
});

connectToDatabase()
  .then(() => {
    app.listen(3000, () => console.log('Server running......'));
  })
  .catch((error) => {
    console.error('Error starting server:', error.message);
    process.exit(1);
  });
