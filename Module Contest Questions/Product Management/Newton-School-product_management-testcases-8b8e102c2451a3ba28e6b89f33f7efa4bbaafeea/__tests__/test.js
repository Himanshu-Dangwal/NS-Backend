const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../src/app');
const mongoose = require('mongoose');
const Product = require('../models/productModel');

chai.use(chaiHttp);
const expect = chai.expect;
const prodURI = 'mongodb://mongoService:27017/produc_management';
const JWT_SECRET = 'HelloFromNodeJsTestingAssignment';

describe('Product API', () => {
  before(async () => {
    await mongoose.connect(prodURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    await Product.deleteMany({});
  });

  after(async () => {
    await mongoose.disconnect();
  });

  it('should retrieve paginated products', async () => {
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
    ];
    await Product.insertMany(products);

    const res = await chai.request(app).get('/api/v1/paginate?page=1&limit=2');
    expect(res).to.have.status(200);
    expect(res.body).to.be.an('array');
    expect(res.body.length).to.equal(2);
  });

  it('should retrieve products sorted by price', async () => {
    const res = await chai.request(app).get('/api/v1/sort?sort=price');
    expect(res).to.have.status(200);
    expect(res.body).to.be.an('array');
    // TODO: Add assertions for sorting order
  });

  it('should retrieve products filtered by category', async () => {
    const res = await chai
      .request(app)
      .get('/api/v1/filter?category=electronics');
    expect(res).to.have.status(200);
    expect(res.body).to.be.an('array');
    // TODO: Add assertions for filtering
  });
});
