const mongoose = require('mongoose');

const MessLogSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true,
        default: Date.now
    },
    day: {
        type: String, 
        required: true
    },
    menuItem: {
        type: String, 
        required: true
    },
    weather: {
        type: String, 
        required: true
    },
    attendance: {
        type: Number, 
        required: true
    },
    preparedQty: {
        type: Number, 
        required: true
    },
    wastedQty: {
        type: Number, 
        required: true
    }
});

module.exports = mongoose.model('MessLog', MessLogSchema);