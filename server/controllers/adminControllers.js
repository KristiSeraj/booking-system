const User = require("../models/User");
const Appointment = require("../models/Appointment");
const Service = require("../models/Service");

// Get all users
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({});
        return res.status(200).json(users);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}

// Get all appointments
const getAllAppointments = async (req, res) => {
    try {
        const appointments = await Appointment.find({})
            .populate('service', 'title description')
            .populate('customer', 'name email')
            .populate('provider', 'name email')
            .sort({ dateTime: 1 });
        return res.status(200).json(appointments);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}

// Get all services
const getAllServices = async (req, res) => {
    try {
        const services = await Service.find({}).populate('provider', 'name');
        return res.status(200).json(services);
    } catch (error) {
        return res.status(400).json({ message: error.message })
    }
}

// Delete user by id
const deleteUserById = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }
        if (user.role === 'provider') {
            await Appointment.updateMany({ provider: req.params.id }, { $set: { 'status': 'Canceled' }});
        }
        if (user.role === 'customer') {
            await Appointment.updateMany({ customer: req.params.id }, { $set: { 'status': 'Canceled' }});
        }
        return res.status(200).json({ message: `User with ID ${req.params.id} is deleted successfully` });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}

// Delete appointment by id
const deleteAppointmentById = async (req, res) => {
    try {
        const appointment = await Appointment.findByIdAndDelete(req.params.id);
        if (!appointment) {
            return res.status(404).json({ message: 'Appointment not found.' });
        }
        return res.status(200).json({ message: `Appointment with ID ${req.params.id} is deleted successfully` });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}

// Delete service by id
const deleteServiceById = async (req, res) => {
    try {
        const service = await Service.findByIdAndDelete(req.params.id);
        if (!service) {
            return res.status(404).json({ message: 'Service not found.' });
        }
        await Appointment.updateMany({ service: req.params.id }, { $set: { 'status': 'Canceled' }});
        return res.status(200).json({ message: `Service with ID ${req.params.id} is deleted successfully` });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}

module.exports = { getAllUsers, getAllAppointments, getAllServices, deleteUserById, deleteAppointmentById, deleteServiceById };