const express = require('express');
const router = express.Router();
const MessLog = require('../models/MessLog');


router.get('/', async (req, res) => {
    try {
        const logs = await MessLog.find().sort({ date: 1 }); 
        res.json(logs);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


router.post('/add', async (req, res) => {
    try {
        const newLog = new MessLog(req.body);
        const savedLog = await newLog.save();
        res.status(201).json(savedLog);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});


router.post('/seed', async (req, res) => {
    try {
        await MessLog.deleteMany({});

        const insertedLogs = await MessLog.insertMany(req.body);
        res.json({ message: "✅ Bulk Mess Data Imported!", count: insertedLogs.length });
    } catch (err) {
        res.status(500).json({ message: "Import Failed", error: err.message });
    }
});

module.exports = router;