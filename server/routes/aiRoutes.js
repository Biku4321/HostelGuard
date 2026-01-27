const express = require('express');
const router = express.Router();
const { GoogleGenerativeAI } = require("@google/generative-ai");
const MessLog = require('../models/MessLog');

// 1. Force Load Environment Variables (Fix for API Key Error)
require('dotenv').config(); 

// Debugging: Check if key is loaded (Console mein print hoga)
console.log("🔑 Loaded Gemini Key:", process.env.GEMINI_API_KEY ? "Yes (Ends with " + process.env.GEMINI_API_KEY.slice(-4) + ")" : "NO ❌");

router.get('/suggest-menu', async (req, res) => {
    try {
        // 2. Initialize INSIDE the route (Safer)
        // Isse agar key server start hone ke baad bhi load hui, toh bhi chal jayega
        if (!process.env.GEMINI_API_KEY) {
            throw new Error("API Key is missing in .env file");
        }
        
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        
        // --- DATA FETCHING ---
        const logs = await MessLog.find().sort({ date: -1 }).limit(7);
        const hatedItems = logs
            .filter(log => log.wastedQty > 5)
            .map(log => log.menuItem);
        const uniqueHated = [...new Set(hatedItems)].join(", ");

        // --- GEMINI PROMPT ---
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-lite" });

        const prompt = `
            Act as a Hostel Nutritionist. 
            Context: Students recently wasted these items: [${uniqueHated}].
            
            Task: Suggest a 3-day Dinner Menu that avoids the hated items.
            Format STRICTLY as JSON:
            [
                { "day": "Day 1", "dish": "Name", "reason": "Short reason" },
                { "day": "Day 2", "dish": "Name", "reason": "Short reason" },
                { "day": "Day 3", "dish": "Name", "reason": "Short reason" }
            ]
            Only JSON, no extra text.
        `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        
        // Clean JSON String
        const cleanJson = text.replace(/```json/g, "").replace(/```/g, "").trim();
        
        res.json(JSON.parse(cleanJson));

    } catch (error) {
        console.error("❌ AI Error Details:", error.message);
        // User ko friendly error bhejo
        res.status(500).json({ 
            day: "Error", 
            dish: "AI Brain Down", 
            reason: "Check Server Console for API Key Error" 
        });
    }
});

module.exports = router;