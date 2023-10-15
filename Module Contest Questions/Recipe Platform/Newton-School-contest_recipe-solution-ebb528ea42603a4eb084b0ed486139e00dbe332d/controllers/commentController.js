const Comment = require('../models/commentModel');
const Recipe = require('../models/recipeModel');
const User = require('../models/userModel');

const createComment = async (req, res) => {
  try {
    const { text } = req.body;
    const userId = req.user.userId;
    const { recipeId } = req.params;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(401).json({ message: 'User not found!' });
    }

    const newComment = new Comment({
      text,
      user,
      recipe: recipeId,
    });

    await newComment.save();

    const recipe = await Recipe.findByIdAndUpdate(recipeId, {
      $push: { comments: newComment._id },
    });
    return res
      .status(201)
      .json({ message: 'Comment created successfully', comment: newComment });
  } catch (error) {
    console.error('Error creating comment:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  createComment,
};
