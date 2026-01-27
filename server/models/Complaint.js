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
        type: String, // User ka likha hua message
        required: true
    },
    sentimentScore: {
        type: Number, // AI calculate karke yahan fill karega (-1 to +1)
        default: 0
    },
    isUrgent: {
        type: Boolean, // Agar AI ko "Poison" word mile toh true kar dega
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Complaint', ComplaintSchema);