const express = require('express');
const cors = require('cors');
const path = require('path');
const carRoutes = require('./routes/carRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000'],
  credentials: true,
}));
app.use(express.json());

// Serve static images
app.use('/images', express.static(path.join(__dirname, 'public', 'images')));

// API Routes
app.use('/api/cars', carRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Civic Type R API is running' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🏎️  Civic Type R API running on http://localhost:${PORT}`);
  console.log(`📡 Endpoints:`);
  console.log(`   GET /api/cars`);
  console.log(`   GET /api/cars/:id`);
});
