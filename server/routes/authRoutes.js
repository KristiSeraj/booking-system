const express = require('express');
const router = express.Router();
const { register, login, getAuthUser} = require('../controllers/authControllers');
const auth = require('../middlewares/authenticate');

router.post('/register', register);
router.post('/login', login);
router.get('/', auth, getAuthUser)

module.exports = router;