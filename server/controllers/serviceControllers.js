const Service = require('../models/Service');
const User = require('../models/User');

// Create service -> provider
const createService = async (req, res) => {
    try {
        const { title, description } = req.body;
        const service = await new Service({ title, description, provider: req.user.id });
        await service.save();
        return res.status(201).json(service);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}

// Get a service -> customer & provider
const getService = async (req, res) => {
    try {
        const service = await Service.findById(req.params.id);
        if (!service) {
            return res.status(404).json({ message: 'Service not found!' });
        }
        return res.status(200).json(service);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}

// Get services of logged-in provider -> provider
const getServices = async (req, res) => {
    try {
        const provider = await User.findById(req.user.id)
            .populate('services')
            .select('name');
        if (!provider) {
            return res.status(404).json({ message: 'Provider not found!' });
        }
        return res.status(200).json(provider);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}

// Edit service -> provider
const editService = async (req, res) => {
    try {
        const { title, description } = req.body;
        const service = await Service.findOne({ _id: req.params.id, provider: req.user.id });
        if (!service) {
            return res.status(404).json({ message: 'Service not found or you are not authorized to edit this service!' });
        }
        service.title = title || service.title;
        service.description = description || service.description;
        await service.save();
        return res.status(200).json({ message: 'Service updated successfully', service });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}

// Create slot for a service -> provider
const createSlot = async (req, res) => {
    try {
        const { dateTime, isBooked } = req.body;
        const service = await Service.findOne({ _id: req.params.id, provider: req.user.id})
        if (!service) {
            return res.status(404).json({ message: 'Service not found!' });
        }
        const existingSlot = service.availableSlots.find((slot) => slot.dateTime.toISOString() === new Date(dateTime).toISOString());
        if (existingSlot) {
            return res.status(404).json({ message: 'Slot already exists at this time!' });
        }
        service.availableSlots.push({ dateTime });
        await service.save();
        return res.status(201).json({ message: 'Slot created!', service });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}

// Get all providers and their services listed -> customer
const getAllProvidersAndServices = async (req, res) => {
    try {
        const providers = await User.find({ role: 'provider' })
            .populate({
                path: 'services',
                select: 'title'
            })
            .select('name');
        if (!providers.length) {
            return res.status(404).json({ message: 'No providers found!' });
        }
        return res.status(200).json(providers);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}


module.exports = { createService, getService, getAllProvidersAndServices, getServices, editService, createSlot };