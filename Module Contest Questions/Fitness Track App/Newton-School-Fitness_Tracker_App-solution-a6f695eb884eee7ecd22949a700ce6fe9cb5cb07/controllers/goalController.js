const Goal = require('../models/goalModel');

const createGoal = async (req, res) => {
  try {
    const { target, deadline, type } = req.body;
    const goal = new Goal({ target, deadline, type });
    await goal.save();
    res.status(201).json({ message: 'Goal created successfully', goal });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Internal server error', error: error.message });
  }
};

const getGoals = async (req, res) => {
  try {
    const goals = await Goal.find();
    res.status(200).json(goals);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Internal server error', error: error.message });
  }
};

const getGoalById = async (req, res) => {
  const goalId = req.params.id;

  try {
    const goal = await Goal.findById(goalId);
    if (!goal) {
      return res.status(404).json({ message: 'Goal not found' });
    }
    res.status(200).json(goal);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Internal server error', error: error.message });
  }
};

const updateGoal = async (req, res) => {
  const goalId = req.params.id;
  const updateInfo = req.body;

  try {
    const updatedGoal = await Goal.findByIdAndUpdate(goalId, updateInfo, {
      new: true,
    });
    if (!updatedGoal) {
      return res.status(404).json({ message: 'Goal not found' });
    }
    res
      .status(200)
      .json({ message: 'Goal updated successfully', goal: updatedGoal });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Internal server error', error: error.message });
  }
};

const deleteGoal = async (req, res) => {
  const goalId = req.params.id;

  try {
    const deletedGoal = await Goal.findByIdAndDelete(goalId);
    if (!deletedGoal) {
      return res.status(404).json({ message: 'Goal not found' });
    }
    res
      .status(200)
      .json({ message: 'Goal deleted successfully', goal: deletedGoal });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Internal server error', error: error.message });
  }
};

const sortGoals = async (req, res) => {
  const order = req.params.order;

  try {
    let sortDirection = 1;
    if (order === 'desc') {
      sortDirection = -1;
    }

    const sortedGoals = await Goal.find().sort({ target: sortDirection });
    res.status(200).json(sortedGoals);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Internal server error', error: error.message });
  }
};

const getGoalsByType = async (req, res) => {
  const goalType = req.params.type;

  try {
    const goals = await Goal.find({ type: goalType });
    res.status(200).json(goals);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Internal server error', error: error.message });
  }
};

const getGoalsByDeadline = async (req, res) => {
  const deadline = req.params.deadline;

  try {
    const goals = await Goal.find({ deadline: { $lte: new Date(deadline) } });
    res.status(200).json(goals);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Internal server error', error: error.message });
  }
};

module.exports = {
  createGoal,
  getGoals,
  getGoalById,
  updateGoal,
  deleteGoal,
  sortGoals,
  getGoalsByType,
  getGoalsByDeadline,
};
