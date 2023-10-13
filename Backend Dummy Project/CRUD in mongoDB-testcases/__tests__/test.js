const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');
const app = require('../src/app');

const testURI = 'mongodb://localhost:27017/crud';
const prodURI = 'mongodb://mongoService:27017/crud';

const expect = chai.expect;
chai.use(chaiHttp);

describe('User Routes', () => {
  
    it('should return success message',async () => {
        try {
            const res = await chai.request(app).get('/api/user')
            expect(res.body.message).to.equal("Success")
        } catch (error) {
            console.error("Error in test: ",error);
            throw error
        }
    })

});
