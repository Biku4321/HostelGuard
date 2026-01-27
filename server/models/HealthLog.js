const mongoose = require('mongoose');

const HealthLogSchema = new mongoose.Schema({
    studentId: {
        type: String, // e.g., "STU101"
        required: true
    },
    roomNumber: {
        type: String, // e.g., "201" (String rakha hai incase "A-201" ho)
        required: true
    },
    symptom: {
        type: String, // e.g., "Stomach Pain", "Fever"
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