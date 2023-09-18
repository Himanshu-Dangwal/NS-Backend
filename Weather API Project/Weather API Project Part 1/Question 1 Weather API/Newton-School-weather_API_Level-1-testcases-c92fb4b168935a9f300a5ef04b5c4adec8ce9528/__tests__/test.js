// const chai  = require('chai');
// const expect = chai.expect;
// const chaiHttp = require('chai-http');
// // const sinon = require('sinon');
// const app =  require('../src/app');

// chai.use(chaiHttp);
// chai.should();


// describe('Weather API - Level 1', () => {
//   it('should return city weather data by name', (done) => {
//     chai
//       .request(app)
//       .get('/weather/city/New York')
//       .end((err, res) => {
//         expect(res).to.have.status(200);
//         expect(res.body).to.have.property('message').to.equal('Weather data retrieved');
//         expect(res.body).to.have.property('data');
//         // Add more assertions as needed
//         done();
//       });
//   });
// });

const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
const app = require('../src/app');

chai.use(chaiHttp);
chai.should();

describe('Weather API - Level 1', () => {
  it('should return city weather data by name', async () => {
    try {
      const res = await chai.request(app).get('/weather/city/New York');
      expect(res).to.have.status(200);
      expect(res.body).to.have.property('message').to.equal('Weather data retrieved');
      expect(res.body).to.have.property('data');
      // Add more assertions as needed
    } catch (err) {
      throw err;
    }
  });
});
