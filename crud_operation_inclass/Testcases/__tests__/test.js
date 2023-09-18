const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');
const app = require('../src/app');
const User = require('../model/userModel');

const testURI = 'mongodb://localhost:27017/crud';
const prodURI = 'mongodb://mongoService:27017/crud';

const expect = chai.expect;
chai.use(chaiHttp);

describe('User Routes', () => {
  before(async () => {
    await mongoose
      .connect(prodURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then((res) => console.log('> Connected...'))
      .catch((err) =>
        console.log(`> Error while connecting to mongoDB : ${err.message}`)
      );
  });

  after(async () => {
    await User.deleteMany({});
    await mongoose.connection.close();
    console.log('Disconnected from DB');
  });

  it('should create a new user', async () => {
    const newUser = {
      name: 'John Doe',
      email: 'johndoe@example.com',
    };

    try {
      const res = await chai.request(app).post('/api/users').send(newUser);

      expect(res).to.have.status(201);
      expect(res.body).to.be.an('object');
      expect(res.body.message).to.equal('User created');
      expect(res.body.user).to.have.property('_id');
    } catch (error) {
      console.error('Error in test:', error);
      throw error;
    }
  });

  it('should get a user by ID', async () => {
    const newUser = await User.create({
      name: 'Alice',
      email: 'alice@example.com',
    });

    const res = await chai.request(app).get(`/api/users/${newUser._id}`);

    expect(res).to.have.status(200);
    expect(res.body).to.be.an('object');
    expect(res.body.user._id).to.equal(newUser._id.toString());
  });

  it('should update a user by ID', async () => {
    const newUser = await User.create({
      name: 'Bob',
      email: 'bob@example.com',
    });

    const updatedUserData = {
      name: 'Updated Bob',
    };

    const res = await chai
      .request(app)
      .patch(`/api/users/${newUser._id}`)
      .send(updatedUserData);

    expect(res).to.have.status(200);
    expect(res.body).to.be.an('object');
    expect(res.body.message).to.equal('User updated');
    expect(res.body.user.name).to.equal(updatedUserData.name);
  });

  it('should delete a user by ID', async () => {
    const newUser = await User.create({
      name: 'Eve',
      email: 'eve@example.com',
    });

    const res = await chai.request(app).delete(`/api/users/${newUser._id}`);

    expect(res).to.have.status(200);
    expect(res.body).to.be.an('object');
    expect(res.body.message).to.equal('User deleted');
  });
});
