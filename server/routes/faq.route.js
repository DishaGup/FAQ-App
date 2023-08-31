const express = require("express");
const faqRouter = express.Router();

const Question = require("../models/Question");
const Answer = require("../models/Answer");
const verifyToken = require("../middleware/verifyToken");

// Ask a Question

faqRouter.get("/questions", async (req, res) => {
  try {
    const questions = await Question.find()
      .populate({
        path: "answers",
        options: { sort: { rating: -1 }, limit: 4 }, // Sort by rating in descending order and limit to 4 answers
      })
      .exec();
    res.status(201).json(questions);
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

// Rate an Answer

faqRouter.post("/answer/:answerId/rate", verifyToken, async (req, res) => {
  try {
    const user = req.user.userId;
    const answerId = req.params.answerId;

    // Find the answer by its ID
    const answer = await Answer.findById(answerId);

    if (!answer) {
      return res.status(404).json({ error: "Answer not found" });
    }

    // Update the answer's rating and save it
    answer.rating += 1;
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
    const question = await Question.findById(questionId).populate("answers");

    if (!question) {
      return res.status(404).json({ error: "Question not found" });
    }

    res.status(200).json(question);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

faqRouter.get("/search", async (req, res) => {
  try {
    const searchTerm = req.query.q;

    if (!searchTerm || searchTerm.length < 3) {
      return res
        .status(400)
        .json({ error: "Search term should be at least 3 characters long." });
    }

    const regex = new RegExp(searchTerm, "i"); // Case-insensitive search

    const questions = await Question.find({ content: regex }).sort({
      createdAt: -1,
    });

    res.json(questions);
  } catch (error) {
    res.status(500).json({ error: "An error occurred while searching." });
  }
});

module.exports = faqRouter;
