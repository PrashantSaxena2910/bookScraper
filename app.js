// Import required modules
const mongoose = require('mongoose');
const dbConfig = require('./config/database');
const scrapeBooks = require('./scraper/scraper');

// Connect to MongoDB
mongoose.connect(dbConfig.mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Database connection events
mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('Disconnected from MongoDB');
});


