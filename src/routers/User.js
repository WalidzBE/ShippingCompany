const express = require('express');

const router = express.Router();

const {
  signup, login, logout, getme
} = require('../controllers/User');

router.get('/me', getme);
router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', logout);

module.exports = router;
