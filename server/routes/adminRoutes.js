const express = require('express');
const router = express.Router();
const authorizeRole = require('../middlewares/authorizeRole');
const auth = require('../middlewares/authenticate');
const { getAllUsers, getAllAppointments, deleteUserById, deleteAppointmentById, getAllServices, deleteServiceById } = require('../controllers/adminControllers');

router.get('/users', auth ,authorizeRole(['admin']), getAllUsers);
router.get('/appointments', auth, authorizeRole(['admin']), getAllAppointments);
router.get('/services', auth, authorizeRole(['admin']), getAllServices);
router.delete('/users/:id', auth, authorizeRole(['admin']), deleteUserById);
router.delete('/appointments/:id', auth, authorizeRole(['admin']), deleteAppointmentById);
router.delete('/services/:id', auth, authorizeRole(['admin']), deleteServiceById);

module.exports = router;
