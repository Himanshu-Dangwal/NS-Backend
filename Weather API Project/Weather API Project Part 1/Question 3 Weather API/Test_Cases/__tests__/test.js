// const chai  = require('chai');
// const expect = chai.expect;
// const chaiHttp = require('chai-http');
// const sinon = require('sinon');
// const app =  require('../src/app');

// chai.use(chaiHttp);
// chai.should();

// describe('Weather API - Level 3', () => {
//   it('should return city weather data by zip code', (done) => {
//     chai
//       .request(app)
//       .get('/weather/city/zipCode/10001')
//       .end((err, res) => {
//         expect(res).to.have.status(200);
//         expect(res.body).to.have.property('message').to.equal('Weather data retrieved');
//         expect(res.body).to.have.property('data');
//         // Add more assertions as needed
//         done();
//       });
//   });
// });
const chai  = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const app =  require('../src/app');

chai.use(chaiHttp);
chai.should();

describe('Weather API - Level 3', () => {
  it('should return city weather data by zip code', (done) => {
    chai
      .request(app)
      .get('/weather/city/zipCode/10001')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('message').to.equal('Weather data retrieved');
        expect(res.body).to.have.property('data');
        // Add more assertions as needed
        done();
      });
  });
});



