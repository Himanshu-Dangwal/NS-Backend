const express = require('express');

const {
  login,
  signup,
  getAllRegisteredUser,
} = require('../controllers/userController');

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/users', getAllRegisteredUser);

module.exports = router;
