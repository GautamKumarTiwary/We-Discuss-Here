const mongoose = require('mongoose');

const answerSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
    trim: true,
    lowercase: true // Ensure uniformity in answer text
  },
  isCorrect: {
    type: Boolean,
    required: true,
    default: false
  }
});

const questionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  answers: {
    type: [answerSchema],
    validate: {
      validator: function(arr) {
        return arr.length === 4 && arr.filter(a => a.isCorrect).length === 1;
      },
      message: 'There must be exactly 4 answers with exactly one correct answer.'
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Index the question for faster search operations (optional)
questionSchema.index({ question: 1 });

module.exports = mongoose.model('Question', questionSchema);
