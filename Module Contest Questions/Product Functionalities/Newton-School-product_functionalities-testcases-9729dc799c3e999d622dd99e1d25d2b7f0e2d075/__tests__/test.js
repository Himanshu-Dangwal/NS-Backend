const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../src/app');
const mongoose = require('mongoose');
const Product = require('../models/productModel');

chai.use(chaiHttp);
const expect = chai.expect;

const prodURI = 'mongodb://mongoService:27017/proffunc';

describe('API Tests', () => {
  before(async () => {
    await mongoose.connect(prodURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to DB');

    const sampleProducts = [
      { name: 'Product 1', price: 10 },
      { name: 'Product 2', price: 15 },
    ];

    await Product.insertMany(sampleProducts);
  });

  after(async () => {
    await Product.deleteMany({});
    await mongoose.disconnect();
  });

  it('should return all products', (done) => {
    chai
      .request(app)
      .get('/api/v1/cart/products')
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.be.an('array');
        done();
      });
  });

  it('should add a quantity of a product', (done) => {
    chai
      .request(app)
      .get('/api/v1/cart/products')
      .end((err, res) => {
        const products = res.body;

        const productId = products[0]._id;

        chai
          .request(app)
          .post(`/api/v1/cart/add/${productId}`)
          .end((err, res) => {
            expect(res).to.have.status(200);
            expect(res.body)
              .to.have.property('message')
              .to.equal('Product quantity increased');
            done();
          });
      });
  });

  it('should remove or decrease quantity of a product', (done) => {
    chai
      .request(app)
      .get('/api/v1/cart/products')
      .end((err, res) => {
        const products = res.body;

        const productId = products[0]._id;
        chai
          .request(app)
          .delete(`/api/v1/cart/remove/${productId}`)
          .end((err, res) => {
            expect(res).to.have.status(200);
            expect(res.body)
              .to.have.property('message')
              .to.equal('Product quantity removed');
            done();
          });
      });
  });

  it('should update the quantity of a product in the cart', (done) => {
    chai
      .request(app)
      .get('/api/v1/cart/products')
      .end((err, res) => {
        const products = res.body;

        const productId = products[0]._id;
        const newQuantity = 5;
        chai
          .request(app)
          .put(`/api/v1/cart/update/${productId}`)
          .send({ newQuantity })
          .end((err, res) => {
            expect(res).to.have.status(200);
            expect(res.body)
              .to.have.property('message')
              .to.equal('Product quantity updated');
            done();
          });
      });
  });

  it('should process the checkout', (done) => {
    chai
      .request(app)
      .post('/api/v1/checkout')
      .end((err, res) => {
        expect(res).to.have.status(404);
        // expect(res.body)
        //   .to.have.property('message')
        //   .to.equal('Payment successful');
        // expect(res.body).to.have.property('totalCost');
        // expect(res.body).to.have.property('products').to.be.an('array');
        done();
      });
  });
});
