const express = require('express');
const router = express.Router();
const Quiz = require('../models/quiz');
const ObjectId = require('mongodb').ObjectId;

router.get('/', async (req, res) => {
    try {
        const quizzes = await Quiz.find({
            userId: new ObjectId(req.user._id)
        })

        return res.json(quizzes);
    } catch ({ message }) {
        return res.status(500).json({ message });
    }
})

router.post('/', async (req, res) => {
    try {
        if (!req.body.name) {
            throw Error('Name is required.');
        }

        if (!req.body.description) {
            throw Error('Description is required.');
        }

        const quiz = await (new Quiz({ name: req.body.name, description: req.body.description, userId: new ObjectId(req.user._id) })).save();

        return res.json(quiz);
    } catch ({ message }) {
        return res.status(500).json({ message });
    }
})

router.put('/:id', async (req, res) => {
    try {
        if (!req.params.id) {
            throw Error('Quiz ID is not defined.');
        }

        if (!req.body.name) {
            throw Error('Name is required.');
        }

        if (!req.body.description) {
            throw Error('Description is required.');
        }

        await Quiz.findByIdAndUpdate(req.params.id, { name: req.body.name, description: req.body.description });

        return res.json({ status: 200 });

    } catch ({ message }) {
        return res.status(500).json({ message });
    }
})

router.delete('/:id', async (req, res) => {
    try {
        if (!req.params.id) {
            throw Error('Quiz ID is not defined.');
        }

        await Quiz.findByIdAndDelete(req.params.id);

        return res.json({ status: 200 });

    } catch ({ message }) {
        return res.status(500).json({ message });
    }
})

module.exports = router;