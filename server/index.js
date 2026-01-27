const dotenv = require('dotenv');
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

// Route Files Import karein
const messRoutes = require('./routes/messRoutes');
const healthRoutes = require('./routes/healthRoutes');

const complaintRoutes = require('./routes/complaintRoutes');
const aiRoutes = require('./routes/aiRoutes');

dotenv.config();
connectDB();

const app = express();

// Middleware (Limit badhaya taaki bulk data error na de)
app.use(express.json({ limit: '50mb' })); 
app.use(cors());

// ROUTES MOUNTING
app.use('/api/mess', messRoutes);       // URL: http://localhost:5000/api/mess
app.use('/api/health', healthRoutes);   // URL: http://localhost:5000/api/health
app.use('/api/complaints', complaintRoutes);
app.use('/api/ai', aiRoutes);
app.get('/', (req, res) => {
    res.send('🚀 HostelGuard API is running...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});