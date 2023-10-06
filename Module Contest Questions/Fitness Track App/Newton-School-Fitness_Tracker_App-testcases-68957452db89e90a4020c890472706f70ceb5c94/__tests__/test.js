const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');
const app = require('../src/app');
const Goal = require('../models/goalModel');

chai.use(chaiHttp);
const expect = chai.expect;

const prodURI = 'mongodb://mongoService:27017/document';

describe('Goal Controller', () => {
  before(async () => {
    await mongoose.connect(prodURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to DB');

    const initialGoals = [
      {
        target: 1000,
        deadline: '2023-12-31',
        type: 'Weight Loss',
      },
    ];

    await Goal.deleteMany({});
    await Goal.insertMany(initialGoals);
  });

  it('should return all goals', async () => {
    const res = await chai.request(app).get('/api/v1/');
    expect(res).to.have.status(200);
    expect(res.body).to.be.an('array');
    expect(res.body.length).to.equal(1);
  });

  it('should return a single goal by ID', async () => {
    const newGoal = {
      target: 2000,
      deadline: '2023-12-31',
      type: 'Muscle Gain',
    };

    const createRes = await chai.request(app).post('/api/v1/').send(newGoal);
    expect(createRes).to.have.status(201);

    const res = await chai
      .request(app)
      .get(`/api/v1/${createRes.body.goal._id}`);
    expect(res).to.have.status(200);
    expect(res.body).to.be.an('object');
    expect(res.body.target).to.equal(newGoal.target);
  });

  it('should create a new goal', async () => {
    const newGoal = {
      target: 1500,
      deadline: '2023-12-31',
      type: 'Cardio',
    };

    const res = await chai.request(app).post('/api/v1/').send(newGoal);
    expect(res).to.have.status(201);
    expect(res.body).to.have.property('message', 'Goal created successfully');
    expect(res.body.goal).to.have.property('target', newGoal.target);
  });

  it('should update an existing goal', async () => {
    const goal = await Goal.findOne({});
    const updatedGoalData = {
      target: 3000,
      deadline: '2023-12-31',
    };
    const res = await chai
      .request(app)
      .put(`/api/v1/${goal._id}`)
      .send(updatedGoalData);
    expect(res).to.have.status(200);
    expect(res.body).to.have.property('message', 'Goal updated successfully');
    expect(res.body.goal).to.have.property('target', updatedGoalData.target);
  });

  it('should delete an existing goal', async () => {
    const goal = await Goal.findOne({});
    const res = await chai.request(app).delete(`/api/v1/${goal._id}`);
    expect(res).to.have.status(200);
    expect(res.body).to.have.property('message', 'Goal deleted successfully');
    expect(res.body.goal).to.have.property('target', goal.target);
  });

  it('should sort goals', async () => {
    const res = await chai.request(app).get('/api/v1/sort/desc');
    expect(res).to.have.status(200);
    expect(res.body).to.be.an('array');
  });

  it('should get goals by type', async () => {
    const goal = await Goal.findOne({});
    const res = await chai.request(app).get(`/api/v1/type/${goal.type}`);
    expect(res).to.have.status(200);
    expect(res.body).to.be.an('array');
  });

  it('should get goals by deadline', async () => {
    const goal = await Goal.findOne({});
    const deadline = encodeURIComponent(goal.deadline.toISOString());
    const res = await chai.request(app).get(`/api/v1/deadline/${deadline}`);
    expect(res).to.have.status(200);
    expect(res.body).to.be.an('array');
  });

  after(async () => {
    await Goal.deleteMany({});
  });
});
