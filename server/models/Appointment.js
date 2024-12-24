const mongoose = require('mongoose');

const AppointmentSchema = new mongoose.Schema({
    service: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "services",
        required: true
    },
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    provider: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true,
    },
    dateTime: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        enum: ['Booked', 'Completed', 'Canceled'],
        default: 'Booked',
    }
}, { timestamps: true });

module.exports = Appointment = mongoose.model('appointments', AppointmentSchema);