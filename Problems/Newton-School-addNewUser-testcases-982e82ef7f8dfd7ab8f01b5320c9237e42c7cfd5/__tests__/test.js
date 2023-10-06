const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const app = require('../src/app');
// const details = require('../src/data/userDetails.json')

chai.use(chaiHttp);
chai.should();

describe('POST /api/v1/details', () => {
    it('POST /api/v1/details-Checking status code for registering new user', (done) => {
      chai
        .request(app)
        .post('/api/v1/details')
          .end((err, res) => {
            if (err) throw err;
            res.should.have.status(201);
            done();
          });
      });
   it('POST /api/v1/details-Checking message when new user is registered', (done) => {
    chai
      .request(app)
      .post('/api/v1/details')
      .end((err, res) => {
        if (err) throw err;
        res.body.message.should.equal('User registered successfully');
        done();
      });
  });
  it('POST /api/v1/details- Checking status when new user is registered', (done) => {
    chai
      .request(app)
      .post('/api/v1/details')
      .end((err, res) => {
        if (err) throw err;
        res.body.status.should.equal('Success');
        done();
      });
  });
  it('POST /api/v1/details-Checking the data of the new registerd user', (done) => {
    chai
    .request(app)
    .post('/api/v1/details')
    .end((err , res) => {
      if(err) throw err;
      expect([{userDetails:1}]).to.have.deep.members([{userDetails:1}])
      done();
    });
  })
});

