const express = require('express');
const router = express.Router();
const authRoutes = require("./authRoutes");
const adminRoutes = require("./adminRoutes");
const serviceRoutes = require("./serviceRoutes");

router.use('/auth', authRoutes);
router.use('/admin', adminRoutes);
router.use('/service', serviceRoutes);

module.exports = router;