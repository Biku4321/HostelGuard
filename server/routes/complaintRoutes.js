const express = require('express');
const router = express.Router();
const Complaint = require('../models/Complaint'); // Make sure Model exists
const axios = require('axios');

// 1. SAVE COMPLAINT (Student submit karega)
router.post('/add', async (req, res) => {
    try {
        const { studentId, description } = req.body;

        // Step A: Ask Python AI for analysis
        let aiAnalysis = { score: 0, category: 'General', is_urgent: false };
        try {
            const pyRes = await axios.post('http://localhost:8000/analyze-sentiment', { text: description });
            aiAnalysis = pyRes.data;
        } catch (error) {
            console.error("AI Server Offline, skipping NLP");
        }

        // Step B: Save to Database with AI Tags
        const newComplaint = new Complaint({
            studentId,
            description,
            category: aiAnalysis.category,
            sentimentScore: aiAnalysis.score,
            isUrgent: aiAnalysis.is_urgent
        });

        const saved = await newComplaint.save();
        res.status(201).json(saved);

    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// 2. GET ALL COMPLAINTS (Admin Dashboard ke liye)
router.get('/', async (req, res) => {
    try {
        const complaints = await Complaint.find().sort({ createdAt: -1 }); // Newest first
        res.json(complaints);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;