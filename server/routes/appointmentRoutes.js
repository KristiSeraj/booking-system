const express = require('express');
const router = express.Router();
const { bookAppointment, getAllAppointments, getAppointment, changeAppointmentStatus } = require("../controllers/appointmentControllers");
const auth = require("../middlewares/authenticate");
const authorizeRole = require("../middlewares/authorizeRole");

router.post('/book/:serviceId/:slotId', auth, authorizeRole(['customer']), bookAppointment);
router.get('/all', auth, getAllAppointments);
router.get('/:appointmentId', auth, getAppointment);
router.patch('/cancel/:appointmentId', auth, changeAppointmentStatus);

module.exports = router;