const express = require('express');
const router = express.Router();
const HealthLog = require('../models/HealthLog');

// 1. GET ALL SYMPTOMS (AI Clustering ke liye)
router.get('/', async (req, res) => {
    try {
        const logs = await HealthLog.find().sort({ date: -1 });
        res.json(logs);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// 2. REPORT SYMPTOM (Student app se report karega)
router.post('/report', async (req, res) => {
    try {
        const newLog = new HealthLog(req.body);
        const savedLog = await newLog.save();
        res.status(201).json({ message: "Symptom Logged", data: savedLog });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// 3. BULK IMPORT (CSV Data load karne ke liye)
router.post('/seed', async (req, res) => {
    try {
        await HealthLog.deleteMany({});
        const insertedLogs = await HealthLog.insertMany(req.body);
        res.json({ message: "✅ Bulk Health Data Imported!", count: insertedLogs.length });
    } catch (err) {
        res.status(500).json({ message: "Import Failed", error: err.message });
    }
});

module.exports = router;