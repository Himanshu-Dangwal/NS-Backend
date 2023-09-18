const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../src/app');
const jwt = require('jsonwebtoken');

chai.use(chaiHttp);
const expect = chai.expect;

describe('Authentication and Authorization API', () => {
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

  it('should return profile data for a valid token', (done) => {
    chai
      .request(app)
      .get('/profile')
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('message', 'Profile data');
        expect(res.body).to.have.property('user');
        expect(res.body.user).to.have.property('userId');
        expect(res.body.user).to.have.property('username', 'user1');
        done();
      });
  });

  it('should return a 401 status for an invalid token', (done) => {
    const invalidToken = 'invalid-token';
    chai
      .request(app)
      .get('/profile')
      .set('Authorization', `Bearer ${invalidToken}`)
      .end((err, res) => {
        expect(res).to.have.status(401);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('message', 'Invalid token');
        done();
      });
  });
});
