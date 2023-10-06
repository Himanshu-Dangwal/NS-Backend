const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
const jwt = require('jsonwebtoken');

const app = require('../src/app');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

const User = require('../models/userModel');

chai.use(chaiHttp);
chai.should();
dotenv.config();
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);

const JWT_SECRET = 'newtonSchool';

let user, user1, user2, user_token;
const prodURI = 'mongodb://mongoService:27017/Split_Wise-1';
const testURI = 'mongodb://localhost:27017/Split_Wise-1';
describe('checking authentication APIs', () => {
  before(async () => {
    try {
      await mongoose.connect(prodURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log('connected to DB');
      user1 = {
        username: 'joe',
        email: 'joedoe@example.com',
        password: 'password1',
        role: 'admin',
      };

      user2 = {
        username: 'joejoe*',
        email: 'johndoe@example.com',
        password: 'pa1',
        role: 'admin',
      };

      let user3 = {
        username: 'joejoe',
        email: 'johndoe@exacxmple.com',
        password: 'pa12345567',
        role: 'admin',
      };
      //user = await User.create(user1);
    } catch (err) {
      console.log(err);
    }
  });

  after(async () => {
    try {
      await mongoose.connection.db.dropDatabase();
    } catch (err) {
      console.log(err);
    }
  });

  it('POST /api/v1/auth/signup should create a new user and return a 201 response', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/signup')
      .send(user1)
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.have.property('status').equal('success');
        expect(res.body.data).to.have.property('user');
        done();
      });
  });

  it('POST /api/v1/auth/login should login a user, with status 200', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/login')
      .send({ email: user1.email, password: user1.password })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('token').that.is.a('string');
        user_token = res.body.token;
        done();
      });
  });

  it('POST /api/v1/auth/login should not login a user if invalid credentials are provided, with status 401', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'invalid_email@example.com',
        password: 'invalid_password',
      })
      .end((err, res) => {
        expect(res).to.have.status(401);
        expect(res.body)
          .to.have.property('message')
          .that.equals('Invalid email or password');
        expect(res.body).to.have.property('status').that.equals('Error');
        expect(res.body)
          .to.have.property('error')
          .that.equals('Invalid Credentials');
        done();
      });
  });

  it('POST /api/v1/auth/login should return an error if email or password is missing, with status 400', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/login')
      .send({ email: 'invalid_email@example.com' })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body)
          .to.have.property('message')
          .that.equals('Please provide email and password');
        expect(res.body).to.have.property('status').that.equals('Error');
        done();
      });
  });
});
