const express = require("express");
const faqRouter = express.Router();

const Question = require("../models/Question");
const Answer = require("../models/Answer");
const verifyToken = require("../middleware/verifyToken");

// Ask a Question

faqRouter.get("/questions", async (req, res) => {
  try {
    const question = await Question.find();

    res.status(201).json(question);
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
});
faqRouter.get("/answers/:questionId", async (req, res) => {
  try {
    const questionId = req.params.questionId;

    const answers = await Answer.find({ question: questionId }).populate(
      "user"
    );

    res.status(200).json(answers);
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
});

faqRouter.post("/ask", verifyToken, async (req, res) => {
  try {
    const { title, content } = req.body;
    const user = req.user.userId;
    const question = new Question({ title, content, user });
    await question.save();
    res.status(201).json({ message: "Question asked successfully" });
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
});

// Answer a Question
faqRouter.post("/answer/:questionId", verifyToken, async (req, res) => {
  try {
    const { content } = req.body;
    const user = req.user.userId;
    const questionId = req.params.questionId;

    // Create a new answer with the question reference
    const answer = new Answer({ content, user, question: questionId });
    await answer.save();

    // Update the answers array in the associated question
    await Question.findByIdAndUpdate(questionId, {
      $push: { answers: answer._id },
    });

    res.status(201).json({ message: "Answered question successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Approve a Question
faqRouter.put("/approve/:questionId", verifyToken, async (req, res) => {
  try {
    const questionId = req.params.questionId;
    const question = await Question.findByIdAndUpdate(
      questionId,
      { $set: { isApproved: true } },
      { new: true }
    );
    res.json(question);
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
});

// Delete a Question
faqRouter.delete("/delete/:questionId", verifyToken, async (req, res) => {
  try {
    const questionId = req.params.questionId;
    await Question.findByIdAndDelete(questionId);
    res.json({ message: "Question deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
});

// Ban a User
faqRouter.put("/ban/:userId", verifyToken, async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findByIdAndUpdate(
      userId,
      { $set: { isBanned: true } },
      { new: true }
    );
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
});
// Rate an Answer

faqRouter.post("/answer/:answerId/rate", verifyToken, async (req, res) => {
  try {
    const { rating } = req.body;
    const user = req.user.userId;
    const answerId = req.params.answerId;

    // Find the answer by its ID
    const answer = await Answer.findById(answerId);

    if (!answer) {
      return res.status(404).json({ error: "Answer not found" });
    }

    // Update the answer's rating and save it
    answer.rating = rating;
    await answer.save();

    res.status(200).json({ message: "Answer rated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// View a Question and its Answers
faqRouter.get("/question/:questionId", async (req, res) => {
  try {
    const questionId = req.params.questionId;

    // Find the question by its ID and populate its answers
    const question = await Question.findById(questionId).populate('answers');

    if (!question) {
      return res.status(404).json({ error: "Question not found" });
    }

    res.status(200).json(question);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = faqRouter;
