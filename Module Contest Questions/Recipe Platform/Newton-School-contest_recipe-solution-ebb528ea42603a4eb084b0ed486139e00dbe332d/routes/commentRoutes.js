const express = require('express');

const { createComment } = require('../controllers/commentController');
const isLoggedIn = require('../middlewares/isLoggedIn');

const router = express.Router();

router.post('/:recipeId/add', isLoggedIn, createComment);

module.exports = router;
