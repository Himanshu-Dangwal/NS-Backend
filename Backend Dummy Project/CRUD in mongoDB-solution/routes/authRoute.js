const express = require('express');
const router = express.Router();
const {getValue} = require("../controllers/authController")

router.get("/",getValue);

module.exports = router;