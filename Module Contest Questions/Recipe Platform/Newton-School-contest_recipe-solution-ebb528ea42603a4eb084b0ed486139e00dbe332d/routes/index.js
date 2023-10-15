const router = require('express').Router();

router.use('/auth', require('./userRoutes'));
router.use('/recipe', require('./recipeRoutes'));
router.use('/comment', require('./commentRoutes'));

module.exports = router;
