const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authenticate');
const authorizeRole = require('../middlewares/authorizeRole');
const { createService, getService, getAllProvidersAndServices, getServices, editService, createSlot} = require("../controllers/serviceControllers");

router.post('/', auth, authorizeRole(['provider']), createService);
router.get('/:id', auth, getService);
router.get('/providers/all', auth, authorizeRole(['customer']), getAllProvidersAndServices);
router.get('/', auth, authorizeRole(['provider']), getServices);
router.put('/:id', auth, authorizeRole(['provider']), editService);
router.post('/:id/slot', auth, authorizeRole(['provider']), createSlot);

module.exports = router;