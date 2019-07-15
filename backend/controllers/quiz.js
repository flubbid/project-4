const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Quiz = require('../models/quiz');
const ObjectId = require('mongodb').ObjectId;

const getUserFromToken = (headers) => {
    const token = headers['authorization'];

    if (!token) {
        throw Error('You are not authorized.');
    }

    const { user } = jwt.decode(token);

    if (!user || !user._id) {
        return null;
    }

    return user;
}

router.get('/', async (req, res) => {
    try {
        const user = getUserFromToken(req.headers);

        if (!user) {
            throw Error('You are not authorized.');
        }

        const quizzes = await Quiz.find({
            userId: new ObjectId(user._id)
        })

        return res.json(quizzes);
    } catch ({ message }) {
        return res.status(500).json({ message });
    }
})

router.post('/', async (req, res) => {
    try {
        const user = getUserFromToken(req.headers);

        if (!user) {
            throw Error('You are not authorized.');
        }

        if (!req.body.name) {
            throw Error('Name is required.');
        }

        if (!req.body.description) {
            throw Error('Description is required.');
        }

        const quiz = await (new Quiz({ name: req.body.name, description: req.body.description, userId: new ObjectId(user._id) })).save();

        return res.json(quiz);
    } catch ({ message }) {
        return res.status(500).json({ message });
    }
})

router.put('/:id', async (req, res) => {
    try {
        const user = getUserFromToken(req.headers);

        if (!user) {
            throw Error('You are not authorized.');
        }

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
        const user = getUserFromToken(req.headers);

        if (!user) {
            throw Error('You are not authorized.');
        }

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