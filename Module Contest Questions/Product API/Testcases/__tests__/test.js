const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../src/app');
const expect = chai.expect;

chai.use(chaiHttp);

describe('Employee API', () => {
  it('should create a new employee', (done) => {
    const employee = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      position: 'Manager',
    };
    chai
      .request(app)
      .post('/api/employees')
      .send(employee)
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.be.an('object');
        expect(res.body.message).to.equal('Employee created');
        expect(res.body.employee).to.have.property('id');
        expect(res.body.employee.name).to.equal(employee.name);
        expect(res.body.employee.email).to.equal(employee.email);
        expect(res.body.employee.position).to.equal(employee.position);
        done();
      });
  });

  it('should get all employees', (done) => {
    chai
      .request(app)
      .get('/api/employees')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array');
        done();
      });
  });

  it('should update an existing employee', (done) => {
    const updatedEmployeeData = {
      name: 'Updated Name',
      position: 'Updated Position',
    };

    chai
      .request(app)
      .patch('/api/employees/9')
      .send(updatedEmployeeData)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body.message).to.equal('Employee updated');
        expect(res.body.employee).to.have.property('id');
        expect(res.body.employee.name).to.equal(updatedEmployeeData.name);
        expect(res.body.employee.position).to.equal(
          updatedEmployeeData.position
        );
        done();
      });
  });

  it('should delete an existing employee', (done) => {
    chai
      .request(app)
      .delete('/api/employees/10')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body.message).to.equal('Employee deleted');
        done();
      });
  });
});
