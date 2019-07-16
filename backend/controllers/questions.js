const express = require('express');
const router = express.Router();
const Questions = require('../models/questions');
const Quiz = require('../models/quiz');
const ObjectId = require('mongodb').ObjectId;
const _ = require('lodash');

router.get('/:id', async (req, res) => {
    try {
        const quizId = req.params.id;

        if (!quizId || !ObjectId.isValid(quizId)) {
            throw Error('Quiz ID is not valid.');
        }

        const quiz = await Quiz.findById(quizId);

        if (!quiz) {
            throw Error('Could not find the quiz.');
        }

        const questions = await Questions.find({ quizId: new ObjectId(quizId) });

        return res.json({
            ...quiz.toObject(),
            questions: questions
        });
    } catch ({ message }) {
        return res.status(500).json({ message });
    }
});

router.post('/:id', async (req, res) => {
    try {
        const quizId = req.params.id;

        if (!quizId || !ObjectId.isValid(quizId)) {
            throw Error('Quiz ID is not valid.');
        }

        const quiz = await Quiz.findById(quizId);

        if (!quiz) {
            throw Error('Could not find the quiz.');
        }

        if (!req.body.question) {
            throw Error('Quiz Question is required.');
        }

        if (!req.body.answers || !Array.isArray(req.body.answers)) {
            throw Error('Quiz Answers are not defined.');
        }

        if (req.body.answers.length <= 1) {
            throw Error('Please enter at least 2 answers.');
        }

        const correctAnswer = _.find(req.body.answers, { correct: true });

        if (!correctAnswer) {
            throw Error('Please enter one correct answer.');
        }

        await (new Questions({
            quizId: new ObjectId(quizId),
            question: req.body.question,
            answers: req.body.answers
        })).save();

        return res.json({ status: 200 });

    } catch ({ message }) {
        return res.status(500).json({ message });
    }
})

router.delete('/:id/:qid', async (req, res) => {
    try {
        const quizId = req.params.id;

        if (!quizId || !ObjectId.isValid(quizId)) {
            throw Error('Quiz ID is not valid.');
        }

        const quiz = await Quiz.findById(quizId);

        if (!quiz) {
            throw Error('Could not find the quiz.');
        }

        const questionId = req.params.qid;

        if (!questionId || !ObjectId.isValid(questionId)) {
            throw Error('Question ID is not valid.');
        }

        await Questions.findByIdAndDelete(questionId);

        return res.json({ status: 200 });

    } catch ({ message }) {
        return res.status(500).json({ message });
    }
})

module.exports = router;