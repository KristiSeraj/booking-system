const express = require('express');
const router = express.Router();
const { register, login, getAuthUser, updateUser} = require('../controllers/authControllers');
const auth = require('../middlewares/authenticate');

router.post('/register', register);
router.post('/login', login);
router.get('/', auth, getAuthUser)
router.put('/', auth, updateUser);

module.exports = router;