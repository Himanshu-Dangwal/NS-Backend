const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../src/app');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const expect = chai.expect;
const Recipe = require('../models/recipeModel');
const Comment = require('../models/commentModel');
chai.use(chaiHttp);

const prodURI = 'mongodb://mongoService:27017/SplitWise_L-2_Model';
const JWT_SECRET = 'HelloFromNodeJsTestingAssignment';

describe('Recipe API', () => {
  let token;
  before(async () => {
    await mongoose.connect(prodURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to DB');

    const registerResponse = await chai
      .request(app)
      .post('/api/v1/auth/signup')
      .send({
        username: 'testuser',
        email: 'testuser@example.com',
        password: 'testpassword',
      });

    const loginResponse = await chai
      .request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'testuser@example.com',
        password: 'testpassword',
      });

    token = loginResponse.body.token;
  });

  after(async () => {
    await Recipe.deleteMany({});
    await Comment.deleteMany({});
    await mongoose.disconnect();
    console.log('Disconnected from DB');
  });
  let recipeId;

  it('should create a new recipe', async () => {
    const res = await chai
      .request(app)
      .post('/api/v1/recipe/add')
      .set('Authorization', `Bearer ${token}`)
      .send({
        ingredients: ['ingredient1', 'ingredient2'],
        name: 'Test Recipe',
        steps: ['step1', 'step2'],
        category: 'Test Category',
      });

    expect(res).to.have.status(201);
    expect(res.body).to.be.an('object');
    expect(res.body).to.have.property('recipe');
    expect(res.body.recipe).to.have.property('name', 'Test Recipe');

    recipeId = res.body.recipe._id;
  });

  it('should get a specific recipe', async () => {
    const res = await chai
      .request(app)
      .get(`/api/v1/recipe/${recipeId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res).to.have.status(200);
    expect(res.body).to.be.an('object');
    expect(res.body).to.have.property('recipe');
    expect(res.body.recipe).to.have.property('_id', recipeId);
  });

  it('should get all recipes', async () => {
    const res = await chai
      .request(app)
      .get('/api/v1/recipe/')
      .set('Authorization', `Bearer ${token}`);

    expect(res).to.have.status(200);
    expect(res.body).to.be.an('object');
    expect(res.body).to.have.property('recipes');
    expect(res.body.recipes).to.be.an('array');
  });

  it('should create a new comment for a recipe', async () => {
    const recipe = new Recipe({
      name: 'Test Recipe for Comment',
      ingredients: ['ingredient1', 'ingredient2'],
      steps: ['step1', 'step2'],
      category: 'Test Category',
    });
    await recipe.save();

    const res = await chai
      .request(app)
      .post(`/api/v1/comment/${recipe._id}/add`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        text: 'This is a test comment for the recipe.',
      });

    expect(res).to.have.status(201);
    expect(res.body).to.be.an('object');
    expect(res.body).to.have.property('comment');
    expect(res.body.comment).to.have.property(
      'text',
      'This is a test comment for the recipe.'
    );
  });
});
