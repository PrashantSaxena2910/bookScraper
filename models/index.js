const mongoose = require('mongoose');
const dbConfig = require('../config/database');

// Import your models
const Book = require('./book');

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

// Export your models
module.exports = {
  Book,
};
