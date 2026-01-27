const express = require('express');
const router = express.Router();
const MessLog = require('../models/MessLog');

// 1. GET ALL LOGS (Dashboard par charts dikhane ke liye)
router.get('/', async (req, res) => {
    try {
        const logs = await MessLog.find().sort({ date: 1 }); // Purane se naya sort
        res.json(logs);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// 2. ADD DAILY LOG (Kitchen Staff entry karega)
router.post('/add', async (req, res) => {
    try {
        const newLog = new MessLog(req.body);
        const savedLog = await newLog.save();
        res.status(201).json(savedLog);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// 3. BULK IMPORT (CSV Data load karne ke liye - Special Endpoint)
router.post('/seed', async (req, res) => {
    try {
        // Purana data delete karein taaki duplicate na ho (Optional)
        await MessLog.deleteMany({});
        
        // Naya data insert karein
        const insertedLogs = await MessLog.insertMany(req.body);
        res.json({ message: "✅ Bulk Mess Data Imported!", count: insertedLogs.length });
    } catch (err) {
        res.status(500).json({ message: "Import Failed", error: err.message });
    }
});

module.exports = router;