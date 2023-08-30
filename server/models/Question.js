const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  answers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Answer' }],
  isApproved: { type: Boolean, default: false },
}, { timestamps: true });

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;
