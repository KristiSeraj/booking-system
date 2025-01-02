const express = require('express');
const router = express.Router();
const { bookAppointment } = require("../controllers/appointmentControllers");
const auth = require("../middlewares/authenticate");
const authorizeRole = require("../middlewares/authorizeRole");

router.post('/book/:serviceId/:slotId', auth, authorizeRole(['customer']), bookAppointment);

module.exports = router;