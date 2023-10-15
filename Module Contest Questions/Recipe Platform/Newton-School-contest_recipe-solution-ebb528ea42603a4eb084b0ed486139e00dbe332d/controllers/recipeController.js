const Recipe = require('../models/recipeModel');
const Comment = require('../models/commentModel');

const createRecipe = async (req, res) => {
  const { ingredients, name, steps, category } = req.body;
  try {
    const newRecipe = new Recipe({
      ingredients,
      name,
      steps,
      category,
    });

    await newRecipe.save();
    res
      .status(201)
      .json({ message: 'Recipe created successfully', recipe: newRecipe });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const getRecipe = async (req, res) => {
  const { id } = req.params;

  try {
    const recipe = await Recipe.findById(id).populate({
      path: 'comments',
      populate: {
        path: 'user',
        model: 'User',
      },
    });

    await Comment.populate(recipe.comments, { path: 'user' });

    res.status(200).json({ recipe });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
    console.log(error);
  }
};

const getAllRecipe = async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.status(200).json({ recipes });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
    console.log(error);
  }
};

module.exports = {
  createRecipe,
  getRecipe,
  getAllRecipe,
};
