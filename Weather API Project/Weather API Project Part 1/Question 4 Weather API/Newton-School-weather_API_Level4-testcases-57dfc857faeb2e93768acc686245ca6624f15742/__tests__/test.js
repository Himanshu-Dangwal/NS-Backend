const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const app = require('../src/app');

chai.use(chaiHttp);
chai.should();

describe('Weather API - Level 4', () => {
  it('should post weather alerts', async () => {
    const alertData = {
      city: 'New York',
      date: '2023-06-10',
      humidity: 70,
      // Add more alert data as needed
    };

    const res = await chai.request(app)
      .post('/weather/alerts')
      .send(alertData);

    expect(res).to.have.status(200);
    expect(res.body).to.have.property('message').to.equal('Weather alert saved successfully');
    // Add more assertions as needed
  });
});
