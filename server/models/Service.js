const mongoose = require("mongoose");

const ServiceSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    provider: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true,
    }
}, { timestamps: true });

module.exports = Service = mongoose.model('services', ServiceSchema);