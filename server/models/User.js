const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['customer', 'admin', 'provider'],
        default: 'customer',
    }
}, { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }, );

UserSchema.virtual('services', {
    ref: 'services',
    localField: '_id',
    foreignField: 'provider',
})

module.exports = User = mongoose.model('users', UserSchema);