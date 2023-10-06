const express = require('express');
const router = express.Router();
const {
  createGoal,
  getGoals,
  getGoalById,
  updateGoal,
  deleteGoal,
  sortGoals,
  getGoalsByType,
  getGoalsByDeadline,
} = require('../controllers/goalController');

router.post('/', createGoal);
router.get('/', getGoals);
router.get('/:id', getGoalById);
router.put('/:id', updateGoal);
router.delete('/:id', deleteGoal);
router.get('/sort/:order', sortGoals);
router.get('/type/:type', getGoalsByType);
router.get('/deadline/:deadline', getGoalsByDeadline);

module.exports = router;
