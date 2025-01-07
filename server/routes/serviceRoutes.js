const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authenticate');
const authorizeRole = require('../middlewares/authorizeRole');
const { createService, getServiceById, getAllProvidersAndServices, getServices, editService, createSlot, editSlot,
    deleteSlot, deleteService
} = require("../controllers/serviceControllers");

router.post('/', auth, authorizeRole(['provider']), createService);
router.get('/:id', auth, getServiceById);
router.get('/providers/all', auth, authorizeRole(['customer']), getAllProvidersAndServices);
router.get('/', auth, authorizeRole(['provider']), getServices);
router.put('/:id', auth, authorizeRole(['provider']), editService);
router.delete('/:id', auth, authorizeRole(['provider']), deleteService);
router.post('/:id/slot', auth, authorizeRole(['provider']), createSlot);
router.put('/:serviceId/slot/:slotId', auth, authorizeRole(['provider']), editSlot);
router.delete('/:serviceId/slot/:slotId', auth, authorizeRole(['provider']), deleteSlot);

module.exports = router;