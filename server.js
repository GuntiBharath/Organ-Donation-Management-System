// Backend server setup for LifeShare Organ Donation Management System

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware setup for CORS and JSON parsing
app.use(cors());
app.use(express.json());

// MongoDB connection string with fallback to environment variable
const mongoUri = process.env.MONGODB_URI || 'mongodb+srv://<Username>:<Password>@cluster0.mongodb.net/lifeshare?retryWrites=true&w=majority';

// Connect to MongoDB with options for new URL parser and unified topology
mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch((err) => console.error('MongoDB connection error:', err));

// Import route handlers for donors, recipients, and hospitals
const donorRoutes = require('./routes/donor');
const recipientRoutes = require('./routes/recipient');
const hospitalRoutes = require('./routes/hospital');

// Register API routes with appropriate base paths
app.use('/api/donors', donorRoutes);
app.use('/api/recipients', recipientRoutes);
app.use('/api/hospitals', hospitalRoutes);

// Root route to confirm API is running
app.get('/', (req, res) => {
  res.send('LifeShare API is running');
});

// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
