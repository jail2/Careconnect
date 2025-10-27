const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();
console.log('Environment variables loaded.'); // Add this line

const app = express();
const PORT = process.env.PORT || 5000;
console.log(`Attempting to connect to MongoDB with URI: ${process.env.MONGODB_URI}`); // Add this line

// Middleware
app.use(cors());
app.use(express.json()); // For parsing application/json

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('MongoDB connection error:', err));

// Q&A 스키마 및 모델 정의
const qaSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  answer: {
    type: String,
    default: 'No answer yet',
  },
});

const QA = mongoose.model('QA', qaSchema);

// API Routes

// Get all Q&A items
app.get('/api/qa', async (req, res) => {
  try {
    const qaItems = await QA.find();
    res.json(qaItems);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new Q&A item
app.post('/api/qa', async (req, res) => {
  const qa = new QA({
    question: req.body.question,
    answer: req.body.answer,
  });
  try {
    const newQA = await qa.save();
    res.status(201).json(newQA);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Add an answer to a Q&A item (or update existing answer)
app.patch('/api/qa/:id', async (req, res) => {
  try {
    const qa = await QA.findById(req.params.id);
    if (qa == null) {
      return res.status(404).json({ message: 'Cannot find Q&A item' });
    }
    if (req.body.answer != null) {
      qa.answer = req.body.answer;
    }
    const updatedQA = await qa.save();
    res.json(updatedQA);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a Q&A item
app.delete('/api/qa/:id', async (req, res) => {
  try {
    const qa = await QA.findById(req.params.id);
    if (qa == null) {
      return res.status(404).json({ message: 'Cannot find Q&A item' });
    }
    await qa.deleteOne();
    res.json({ message: 'Deleted Q&A item' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});