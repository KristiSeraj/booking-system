const User = require("../models/User");
const Appointment = require("../models/Appointment");

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({});
        return res.status(200).json(users);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}

const getAllAppointments = async (req, res) => {
    try {
        const appointments = await Appointment.find({});
        return res.status(200).json(appointments);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}

const deleteUser = async (req, res) => {
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

const deleteAppointment = async (req, res) => {
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

module.exports = { getAllUsers, getAllAppointments, deleteUser, deleteAppointment };