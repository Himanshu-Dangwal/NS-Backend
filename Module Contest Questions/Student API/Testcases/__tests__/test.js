const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../src/app');
const fs = require('fs');
const path = require('path');
const expect = chai.expect;

chai.use(chaiHttp);

const testData = [
  { id: 1, name: 'Student 1', grade: 90 },
  { id: 2, name: 'Student 2', grade: 85 },
  { id: 3, name: 'Student 3', grade: 95 },
];

const tempFilePath = path.join(__dirname, 'tempData.json');
fs.writeFileSync(tempFilePath, JSON.stringify(testData));

describe('Student API', () => {
  it('should get all students', (done) => {
    chai
      .request(app)
      .get('/api/students')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array');
        done();
      });
  });

  it('should get a student by ID', (done) => {
    const studentId = 1;
    chai
      .request(app)
      .get(`/api/students/${studentId}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body.id).to.equal(studentId);
        done();
      });
  });

  it('should create a new student', (done) => {
    const newStudent = { name: 'New Student', grade: 88 };
    chai
      .request(app)
      .post('/api/students')
      .send(newStudent)
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.be.an('object');
        expect(res.body.message).to.equal('Student created');
        expect(res.body.student).to.have.property('id');
        expect(res.body.student.name).to.equal(newStudent.name);
        expect(res.body.student.grade).to.equal(newStudent.grade);
        done();
      });
  });

  it('should update an existing student', (done) => {
    const studentId = 2;
    const updatedStudent = { name: 'Updated Student', grade: 92 };
    chai
      .request(app)
      .patch(`/api/students/${studentId}`)
      .send(updatedStudent)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body.message).to.equal('Student updated');
        expect(res.body.student).to.have.property('id');
        expect(res.body.student.name).to.equal(updatedStudent.name);
        expect(res.body.student.grade).to.equal(updatedStudent.grade);
        done();
      });
  });

  it('should delete an existing student', (done) => {
    const studentId = 3;
    chai
      .request(app)
      .delete(`/api/students/${studentId}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body.message).to.equal('Student deleted');
        done();
      });
  });

  after(() => {
    fs.unlinkSync(tempFilePath);
  });
});
