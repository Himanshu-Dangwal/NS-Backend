const fs = require('fs');
const path = require('path');

const studentsFilePath = path.join(__dirname, '../data', 'data.json');

const getAllStudents = (req, res) => {
  fs.readFile(studentsFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
      return;
    }

    let students = JSON.parse(data);

    const sortBy = req.query.sort;
    if (sortBy === 'grade') {
      students.sort((a, b) => a.grade - b.grade);
    } else if (sortBy === 'gradeDesc') {
      students.sort((a, b) => b.grade - a.grade);
    }

    res.status(200).json(students);
  });
};

const getStudentById = (req, res) => {
  const studentId = parseInt(req.params.id);

  fs.readFile(studentsFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
      return;
    }

    const students = JSON.parse(data);
    const student = students.find((stud) => stud.id === studentId);

    if (!student) {
      res.status(404).json({ message: 'Student not found' });
      return;
    }

    res.status(200).json(student);
  });
};

const createStudent = (req, res) => {
  const { name, grade } = req.body;

  fs.readFile(studentsFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
      return;
    }

    const students = JSON.parse(data);
    const newStudent = {
      id: generateStudentId(students),
      name,
      grade,
    };
    students.push(newStudent);

    fs.writeFile(studentsFilePath, JSON.stringify(students), (err) => {
      if (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
        return;
      }

      res.status(201).json({ message: 'Student created', student: newStudent });
    });
  });
};

const updateStudent = (req, res) => {
  const studentId = parseInt(req.params.id);
  const { name, grade } = req.body;

  fs.readFile(studentsFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
      return;
    }

    let students = JSON.parse(data);
    const studentIndex = students.findIndex((stud) => stud.id === studentId);

    if (studentIndex === -1) {
      res.status(404).json({ message: 'Student not found' });
      return;
    }

    students[studentIndex] = {
      ...students[studentIndex],
      name,
      grade,
    };

    fs.writeFile(studentsFilePath, JSON.stringify(students), (err) => {
      if (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
        return;
      }

      res.status(200).json({
        message: 'Student updated',
        student: students[studentIndex],
      });
    });
  });
};

const deleteStudent = (req, res) => {
  const studentId = parseInt(req.params.id);

  fs.readFile(studentsFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
      return;
    }

    let students = JSON.parse(data);
    const studentIndex = students.findIndex((stud) => stud.id === studentId);

    if (studentIndex === -1) {
      res.status(404).json({ message: 'Student not found' });
      return;
    }

    const deletedStudent = students.splice(studentIndex, 1);

    fs.writeFile(studentsFilePath, JSON.stringify(students), (err) => {
      if (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
        return;
      }

      res
        .status(200)
        .json({ message: 'Student deleted', student: deletedStudent });
    });
  });
};

const generateStudentId = (students) => {
  const maxId = students.reduce(
    (max, stud) => (stud.id > max ? stud.id : max),
    0
  );
  return maxId + 1;
};

module.exports = {
  getAllStudents,
  getStudentById,
  deleteStudent,
  createStudent,
  updateStudent,
};
