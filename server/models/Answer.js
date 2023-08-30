const mongoose = require('mongoose');

const answerSchema = new mongoose.Schema({
  content: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  rating: { type: Number, default: 0 },
  question: { type: mongoose.Schema.Types.ObjectId, ref: 'Question', required: true }, // Add this field

}, { timestamps: true });

const Answer = mongoose.model('Answer', answerSchema);

module.exports = Answer;
