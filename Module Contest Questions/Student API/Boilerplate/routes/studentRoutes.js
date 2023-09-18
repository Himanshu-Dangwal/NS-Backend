const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');

router.get('/students', studentController.getAllStudents);

router.get('/students/:id', studentController.getStudentById);

router.post('/students', studentController.createStudent);

router.patch('/students/:id', studentController.updateStudent);

router.delete('/students/:id', studentController.deleteStudent);

module.exports = router;
