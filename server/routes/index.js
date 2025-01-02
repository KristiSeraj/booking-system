const express = require('express');
const router = express.Router();
const authRoutes = require("./authRoutes");
const adminRoutes = require("./adminRoutes");
const serviceRoutes = require("./serviceRoutes");
const appointmentRoutes = require("./appointmentRoutes");

router.use('/auth', authRoutes);
router.use('/admin', adminRoutes);
router.use('/service', serviceRoutes);
router.use('/appointment', appointmentRoutes);

module.exports = router;