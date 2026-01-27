const mongoose = require('mongoose');

const MessLogSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true,
        default: Date.now
    },
    day: {
        type: String, // e.g., "Monday"
        required: true
    },
    menuItem: {
        type: String, // e.g., "Paneer Butter Masala"
        required: true
    },
    weather: {
        type: String, // e.g., "Rainy", "Sunny" - affects attendance
        required: true
    },
    attendance: {
        type: Number, // Kitne log aaye
        required: true
    },
    preparedQty: {
        type: Number, // kg mein
        required: true
    },
    wastedQty: {
        type: Number, // kg mein
        required: true
    }
});

module.exports = mongoose.model('MessLog', MessLogSchema);