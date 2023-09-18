const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../src/app');
const jwt = require('jsonwebtoken');

chai.use(chaiHttp);
const expect = chai.expect;

describe('Product API', () => {
  let token = '';

  it('should return a valid JWT token on successful login', (done) => {
    chai
      .request(app)
      .post('/login')
      .send({ username: 'user1', password: 'password1' })
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('token');
        token = res.body.token;
        done();
      });
  });

  it('should return product data for a valid token', (done) => {
    chai
      .request(app)
      .get('/product')
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('message', 'Product data');
        expect(res.body).to.have.property('products');
        expect(res.body.products).to.be.an('array');
        done();
      });
  });

  it('should return a 401 status for an invalid token', (done) => {
    const invalidToken = 'invalid-token';
    chai
      .request(app)
      .get('/product')
      .set('Authorization', `Bearer ${invalidToken}`)
      .end((err, res) => {
        expect(res).to.have.status(401);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('message', 'Invalid token');
        done();
      });
  });
});
