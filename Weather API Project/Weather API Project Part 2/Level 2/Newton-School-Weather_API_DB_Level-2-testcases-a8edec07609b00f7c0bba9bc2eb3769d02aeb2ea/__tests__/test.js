const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../src/app');
const mongoose = require('mongoose');
const WeatherData = require('../models/weatherDataModel');
const User = require('../models/userModel');

const { expect } = chai;
chai.use(chaiHttp);

const prodURI = 'mongodb://mongoService:27017/Split_Wise-1';

describe('Weather API Controller', () => {
  let token;
  before(async () => {
    await mongoose.connect(prodURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    const testWeatherData = [
      {
        cityName: 'Delhi',
        temperature: 25,
        humidity: 70,
        weatherDescription: 'Partly Cloudy',
        zipCode: '10001',
      },
      {
        cityName: 'Mumbai',
        temperature: 30,
        humidity: 60,
        weatherDescription: 'Sunny',
        zipCode: '90001',
      },
    ];

    await WeatherData.deleteMany({});
    await WeatherData.insertMany(testWeatherData);

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
    await WeatherData.deleteMany({});
    await User.deleteMany({});
    console.log('Disconnected from DB');
  });

  it('should get weather data by city name', async () => {
    const cityName = 'Delhi';

    const res = await chai
      .request(app)
      .get(`/api/v1/weather/city/${cityName}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res).to.have.status(200);
    expect(res.body).to.be.an('object');
    expect(res.body).to.have.property('weatherData');
  });

  it('should return 404 for non-existent city', async () => {
    const cityName = 'NonExistentCity123';

    const res = await chai
      .request(app)
      .get(`/api/v1/weather/city/${cityName}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res).to.have.status(404);
    expect(res.body).to.be.an('object');
    expect(res.body).to.have.property(
      'message',
      'Weather data not found for the given city'
    );
  });

  it('should get weather data by zip code', async () => {
    const zipCode = '10001';

    const res = await chai
      .request(app)
      .get(`/api/v1/weather/zip/${zipCode}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res).to.have.status(200);
    expect(res.body).to.be.an('object');
    expect(res.body).to.have.property('weatherData');
  });

  it('should return 404 for non-existent zip code', async () => {
    const zipCode = '00000';

    const res = await chai
      .request(app)
      .get(`/api/v1/weather/zip/${zipCode}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res).to.have.status(404);
    expect(res.body).to.be.an('object');
    expect(res.body).to.have.property(
      'message',
      'Weather data not found for the given zip code'
    );
  });

  it('should post a weather alert', async () => {
    const newWeatherAlert = {
      cityName: 'TestCity',
      temperature: 20,
      humidity: 75,
      weatherDescription: 'Cloudy',
      zipCode: '12345',
    };

    const res = await chai
      .request(app)
      .post('/api/v1/weather/alerts')
      .set('Authorization', `Bearer ${token}`)
      .send(newWeatherAlert);

    expect(res).to.have.status(201);
    expect(res.body).to.be.an('object');
    expect(res.body).to.have.property(
      'message',
      'Weather alert posted successfully'
    );
    expect(res.body).to.have.property('alert');
  });

  it('should return 500 for missing weather alert data', async () => {
    const res = await chai
      .request(app)
      .post('/api/v1/weather/alerts')
      .set('Authorization', `Bearer ${token}`)
      .send({});

    expect(res).to.have.status(500);
    expect(res.body).to.be.an('object');
    expect(res.body).to.have.property('message', 'Internal server error');
  });
});
