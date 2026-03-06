const mongoose = require('mongoose');

const ComplaintSchema = new mongoose.Schema({
    studentId: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    description: {
        type: String, 
        required: true
    },
    sentimentScore: {
        type: Number, 
        default: 0
    },
    isUrgent: {
        type: Boolean, 
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Complaint', ComplaintSchema);