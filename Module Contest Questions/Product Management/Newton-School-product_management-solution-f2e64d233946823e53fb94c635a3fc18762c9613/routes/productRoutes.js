const express = require('express');

const { paginate, sort, filter } = require('../controllers/productController');

const router = express.Router();

router.get('/paginate', paginate);
router.get('/sort', sort);
router.get('/filter', filter);

module.exports = router;
