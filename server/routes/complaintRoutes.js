const express = require('express');
const router = express.Router();
const Complaint = require('../models/Complaint'); 
const axios = require('axios');


router.post('/add', async (req, res) => {
    try {
        const { studentId, description } = req.body;

        
        let aiAnalysis = { score: 0, category: 'General', is_urgent: false };
        try {
            const pyRes = await axios.post('https://hostelguard.onrender.com', { text: description });
            aiAnalysis = pyRes.data;
        } catch (error) {
            console.error("AI Server Offline, skipping NLP");
        }

        
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


router.get('/', async (req, res) => {
    try {
        const complaints = await Complaint.find().sort({ createdAt: -1 }); // Newest first
        res.json(complaints);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;