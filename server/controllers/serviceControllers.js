const Appointment = require('../models/Appointment');
const Service = require('../models/Service');
const User = require('../models/User');

// Create service -> provider
const createService = async (req, res) => {
    try {
        const { title, description } = req.body;
        const service = new Service({ title, description, provider: req.user.id });
        await service.save();
        return res.status(201).json(service);
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
                select: 'title description'
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

// Get a service -> customer & provider
const getServiceById = async (req, res) => {
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
        const service = await Service.findById(req.params.id);
        if (!service || service.provider.toString() !== req.user.id) {
            return res.status(404).json({ message: 'Service not found or you are not authorized to edit this service!' });
        }
        if (title) service.title = title;
        if (description) service.description = description;
        await service.save();
        return res.status(200).json({ message: 'Service updated successfully', service });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}

// Delete service -> provider
const deleteService = async (req, res) => {
    try {
        const service = await Service.findOneAndDelete({ _id: req.params.id, provider: req.user.id });
        if (!service) {
            return res.status(404).json({ message: 'Service not found or you are not authorized to delete this service!' });
        }
        await Appointment.updateMany({ service: req.params.id }, { $set: { 'status': 'Canceled' }});
        return res.status(200).json({ message: 'Service deleted successfully' });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}

// Create slot for a service -> provider
const createSlot = async (req, res) => {
    try {
        const { dateTime } = req.body;
        const service = await Service.findOne({ _id: req.params.id, provider: req.user.id})
        if (!service) {
            return res.status(404).json({ message: 'Service not found!' });
        }
        const normalizedDateTime = new Date(`${dateTime}Z`).toISOString();
        const existingSlot = service.availableSlots.find((slot) => new Date(slot.dateTime).toISOString() === normalizedDateTime);
        if (existingSlot) {
            return res.status(404).json({ message: 'Slot already exists at this time!' });
        }
        service.availableSlots.push({ dateTime: normalizedDateTime });
        await service.save();
        return res.status(201).json({ message: 'Slot created!', service });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}

// Edit slot -> provider
const editSlot = async (req, res) => {
    try {
        const { serviceId, slotId } = req.params;
        const { dateTime } = req.body;
        const service = await Service.findOneAndUpdate(
            { _id: serviceId, provider: req.user.id, 'availableSlots._id': slotId },
            { $set: { 'availableSlots.$.dateTime': dateTime } },
            { new: true });
        if (!service) {
            return res.status(404).json({ message: 'Service or slot not found!' });
        }
        return res.status(200).json({ message: 'Slot updated successfully!', service });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}

// Delete slot -> provider
const deleteSlot = async (req, res) => {
    try {
        const { serviceId, slotId } = req.params;
        const service = await Service.findOneAndUpdate(
            { _id: serviceId, provider: req.user.id },
            { $pull: { availableSlots: { _id: slotId } } },
            { new: true});
        if (!service) {
            return res.status(404).json({ message: 'Service not found!' });
        }
        return res.status(200).json({ message: 'Slot deleted successfully!', service });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}

module.exports = { createService, getServiceById, getAllProvidersAndServices, getServices, editService, deleteService, createSlot, editSlot, deleteSlot };