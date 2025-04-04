const express = require('express');
const router = express.Router();
const Question = require('../models/Question');

// Post a new question
router.post('/questions', async (req, res) => {
  try {
    const { question, answers } = req.body;

    // Validate input
    if (!question?.trim() || !Array.isArray(answers) || answers.length !== 4) {
      return res.status(400).json({ error: 'Question and 4 answers are required' });
    }

    // Check for empty answer texts
    if (answers.some(answer => !answer.text?.trim())) {
      return res.status(400).json({ error: 'All answer options must be filled' });
    }

    // Ensure exactly one correct answer is marked
    const correctAnswers = answers.filter(answer => answer.isCorrect === true);
    if (correctAnswers.length !== 1) {
      return res.status(400).json({ error: 'Exactly one correct answer is required' });
    }

    // Check if the question already exists to avoid duplicates
    const existingQuestion = await Question.findOne({ question: question.trim() });
    if (existingQuestion) {
      return res.status(409).json({ error: 'This question already exists' });
    }

    // Create and save the new question
    const newQuestion = new Question({ question: question.trim(), answers });
    await newQuestion.save();

    res.status(201).json(newQuestion);
  } catch (error) {
    console.error('Error creating question:', error);
    res.status(500).json({ 
      error: error.message || 'Internal server error' 
    });
  }
});

// Get all questions
router.get('/questions', async (req, res) => {
  try {
    const questions = await Question.find().select('-__v');
    res.json(questions);
  } catch (error) {
    console.error('Error fetching questions:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
