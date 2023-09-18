const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
// const sinon = require('sinon');
const app = require('../src/app');

chai.use(chaiHttp);
chai.should();

describe('Weather API - Level 2', () => {
  it('should return 7 days weather forecast data by name', async () => {
    const res = await chai.request(app).get('/weather/forecast/city/New York');

    expect(res).to.have.status(200);
    expect(res.body).to.have.property('message').to.equal('Forecast data retrieved');
    expect(res.body).to.have.property('data');
    // Add more assertions as needed
  });
});


