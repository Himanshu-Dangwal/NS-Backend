const express = require('express');

const {
  createRecipe,
  getRecipe,
  getAllRecipe,
} = require('../controllers/recipeController');

const isLoggedIn = require('../middlewares/isLoggedIn');

const router = express.Router();

router.post('/add', isLoggedIn, createRecipe);
router.get('/:id', isLoggedIn, getRecipe);
router.get('/', isLoggedIn, getAllRecipe);

module.exports = router;
