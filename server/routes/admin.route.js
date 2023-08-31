const express = require("express");
const adminRouter = express.Router();

const Question = require("../models/Question");
const Answer = require("../models/Answer");
const User = require("../models/User");
const adminCheck = require("../middleware/adminCheck");




// Approve a Question
adminRouter.put("/approve/:questionId", verifyToken, async (req, res) => {
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
adminRouter.delete("/delete/:questionId", verifyToken, async (req, res) => {
    try {
        const questionId = req.params.questionId;
        await Question.findByIdAndDelete(questionId);
        res.json({ message: "Question deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "An error occurred" });
    }
});

// Ban a User
adminRouter.put("/ban/:userId", verifyToken, async (req, res) => {
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


// Get all pending answers
adminRouter.get("/pending-answers", verifyToken, async (req, res) => {
    try {
        const pendingAnswers = await Answer.find({ isApproved: false });
        res.status(200).json(pendingAnswers);
    } catch (error) {
        res.status(500).json({ error: "An error occurred" });
    }
});

// Approve an Answer
adminRouter.put("/approve-answer/:answerId", verifyToken, async (req, res) => {
    try {
        const answerId = req.params.answerId;
        const answer = await Answer.findByIdAndUpdate(
            answerId,
            { $set: { isApproved: true } },
            { new: true }
        );
        res.json(answer);
    } catch (error) {
        res.status(500).json({ error: "An error occurred" });
    }
});

 module.exports = adminRouter