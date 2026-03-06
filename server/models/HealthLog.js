const mongoose = require('mongoose');

const HealthLogSchema = new mongoose.Schema({
    studentId: {
        type: String, 
        required: true
    },
    roomNumber: {
        type: String, 
        required: true
    },
    symptom: {
        type: String, 
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        enum: ['Reported', 'Investigated', 'Resolved'],
        default: 'Reported'
    }
});

module.exports = mongoose.model('HealthLog', HealthLogSchema);