const Appointment = require('../models/Appointment');
const Service = require('../models/Service');

// Book an appointment -> customer
const bookAppointment = async (req, res) => {
    try {
        const { serviceId, slotId } = req.params;
        const customerId = req.user.id;

        const service = await Service.findOne({
            _id: serviceId,
            'availableSlots._id': slotId,
            'availableSlots.isBooked': false
        });
        if (!service) {
            return res.status(404).json({ message: 'Service or available slot not found!' });
        }
        const slot = service.availableSlots.find((slot) => slot._id.toString() === slotId);
        if (!slot) {
            return res.status(404).json({ message: 'Slot not found!' });
        }
        const appointment = new Appointment({
            service: serviceId,
            customer: customerId,
            provider: service.provider,
            dateTime: slot.dateTime,
            status: "Booked",
        })
        await appointment.save();
        await Service.findOneAndUpdate({ _id: serviceId, 'availableSlots._id': slotId }, { $set: { 'availableSlots.$.isBooked': true  }})

        return res.status(200).json({ message: 'Appointment booked successfully', appointment });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}

// Get appointments -> customer, provider
const getAllAppointments = async (req, res) => {
    try {
        const { role, id } = req.user;
        let query = {};
        if (role === 'customer') {
            query.customer = id;
        } else if (role === 'provider') {
            query.provider = id;
        } else {
            return res.status(403).json({ message: 'Access denied' });
        }
        const appointments = await Appointment.find(query)
            .populate('service', 'title description')
            .populate('customer', 'name email')
            .populate('provider', 'name email')
            .sort({ dateTime: 1 });
            
        return res.status(200).json(appointments);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}

// Get an appointment details -> customer, provider
const getAppointment = async (req, res) => {
    try {
        const { id } = req.params;
        const appointment = await Appointment.findById(id)
            .populate('service', 'title description')
            .populate('customer', 'name email')
            .populate('provider', 'name email')

        if (!appointment) {
            return res.status(404).json({ message: 'Appointment not found!' });
        }
        return res.status(200).json(appointment);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}

// Change appointment status -> customer, provider
const changeAppointmentStatus = async (req, res) => {
    try {
        const { appointmentId } = req.params;
        const { role, id } = req.user;
        const { status } = req.body;

        const appointment = await Appointment.findById(appointmentId);

        if (!appointment) {
            return res.status(404).json({ message: 'Appointment not found!' });
        }

        if (role === 'customer' && appointment.customer.toString() !== id) {
            return res.status(403).json({ message: 'You are not authorized to cancel this appointment!' });
        }

        if (role === 'provider' && appointment.provider.toString() !== id) {
            return res.status(403).json({ message: 'You are not authorized to cancel this appointment!' });
        }

        const validateStatus = ['Booked', 'Completed', 'Canceled'];
        if (!validateStatus.includes(status)) {
            return res.status(400).json({ message: 'Invalid status' });
        }

        if (role === 'customer') {
            if (status !== 'Canceled') {
                return res.status(400).json({ message: 'Customers can only cancel their appointment.' });
            }
        }

        if (role === 'provider') {
            if (status === 'Booked') {
                return res.status(400).json({ message: 'Cannot revert an appointment back to booked.' });
            }
        }

        appointment.status = status;
        await appointment.save();

        if (status === 'Canceled' || status === 'Completed') {
            await Service.findOneAndUpdate(
                { _id: appointment.service, 'availableSlots.dateTime': appointment.dateTime },
                { $set: { 'availableSlots.$.isBooked': false } },
            );
        }
        
        return res.status(200).json({ message: `Appointment status updated to ${status}`, appointment });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}

module.exports = { bookAppointment, getAllAppointments, getAppointment, changeAppointmentStatus };