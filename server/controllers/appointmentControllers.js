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

module.exports = { bookAppointment };