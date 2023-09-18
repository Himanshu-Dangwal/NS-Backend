const fs = require('fs');
const path = require('path');

const employeesFilePath = path.join(__dirname, '../data', '/data.json');

const getAllEmployees = (req, res) => {
  fs.readFile(employeesFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
      return;
    }

    const employees = JSON.parse(data);
    res.status(200).json(employees);
  });
};

const getEmployeeById = (req, res) => {
  const employeeId = parseInt(req.params.id);

  fs.readFile(employeesFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
      return;
    }

    const employees = JSON.parse(data);
    const employee = employees.find((emp) => emp.id === employeeId);

    if (!employee) {
      res.status(404).json({ message: 'Employee not found' });
      return;
    }

    res.status(200).json(employee);
  });
};

const createEmployee = (req, res) => {
  const { name, email, position } = req.body;

  fs.readFile(employeesFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
      return;
    }

    const employees = JSON.parse(data);
    const newEmployee = {
      id: generateEmployeeId(employees),
      name,
      email,
      position,
    };
    employees.push(newEmployee);

    fs.writeFile(employeesFilePath, JSON.stringify(employees), (err) => {
      if (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
        return;
      }

      res
        .status(201)
        .json({ message: 'Employee created', employee: newEmployee });
    });
  });
};

const updateEmployee = (req, res) => {
  const employeeId = parseInt(req.params.id);
  const { name, email, position } = req.body;

  fs.readFile(employeesFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
      return;
    }

    let employees = JSON.parse(data);
    const employeeIndex = employees.findIndex((emp) => emp.id === employeeId);

    if (employeeIndex === -1) {
      res.status(404).json({ message: 'Employee not found' });
      return;
    }

    employees[employeeIndex] = {
      ...employees[employeeIndex],
      name,
      email,
      position,
    };

    fs.writeFile(employeesFilePath, JSON.stringify(employees), (err) => {
      if (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
        return;
      }

      res.status(200).json({
        message: 'Employee updated',
        employee: employees[employeeIndex],
      });
    });
  });
};

const deleteEmployee = (req, res) => {
  const employeeId = parseInt(req.params.id);

  fs.readFile(employeesFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
      return;
    }

    let employees = JSON.parse(data);
    const employeeIndex = employees.findIndex((emp) => emp.id === employeeId);

    if (employeeIndex === -1) {
      res.status(404).json({ message: 'Employee not found' });
      return;
    }

    const deletedEmployee = employees.splice(employeeIndex, 1);

    fs.writeFile(employeesFilePath, JSON.stringify(employees), (err) => {
      if (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
        return;
      }

      res
        .status(200)
        .json({ message: 'Employee deleted', employee: deletedEmployee });
    });
  });
};

const generateEmployeeId = (employees) => {
  const maxId = employees.reduce(
    (max, emp) => (emp.id > max ? emp.id : max),
    0
  );
  return maxId + 1;
};

module.exports = {
  getAllEmployees,
  getEmployeeById,
  deleteEmployee,
  createEmployee,
  updateEmployee,
};
