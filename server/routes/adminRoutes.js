const express = require('express');
const router = express.Router();
const authorizeRole = require('../middlewares/authorizeRole');
const auth = require('../middlewares/authenticate');
const { getAllUsers, getAllAppointments, deleteUser, deleteAppointment} = require('../controllers/adminControllers');

router.get('/users', auth ,authorizeRole(['admin']), getAllUsers);
router.get('/appointments', auth, authorizeRole(['admin']), getAllAppointments);
router.delete('/users/:id', auth, authorizeRole(['admin']), deleteUser);
router.delete('/appointments/:id', auth, authorizeRole(['admin']), deleteAppointment);

module.exports = router;
