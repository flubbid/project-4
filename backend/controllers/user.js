const User = require('../models/user');
const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET;

module.exports.signup = async (req, res) => {
    try {
        if (!req.body.name) {
            throw Error('Name is required.');
        }

        if (!req.body.email) {
            throw Error('Email is required.');
        }

        if (!req.body.password || !req.body.passwordConf || req.body.password !== req.body.passwordConf) {
            throw Error('Please enter valid password.');
        }

        const oldUser = await User.findOne({ email: req.body.email });

        if (oldUser) {
            throw Error(`This email has already been used.`);
        }

        const user = await (new User(req.body)).save();

        const token = createJWT(user);

        return res.json({ token });

    } catch ({ message }) {
        res.status(400).json({ message });
    }
}

module.exports.login = async (req, res) => {
    try {
        if (!req.body.email) {
            throw Error('Email is required.');
        }

        if (!req.body.pw) {
            throw Error('Password is required.');
        }

        const user = await User.findOne({ email: req.body.email, password: req.body.pw });

        if (!user) {
            throw Error('Please enter valid credentials.');
        }

        const token = createJWT(user);

        return res.json({ token });

    } catch ({ message }) {
        res.status(400).json({ message });
    }
};


/*----- Helper Functions -----*/

function createJWT(user) {
    return jwt.sign(
        { user }, // data payload
        SECRET,
        { expiresIn: '24h' }
    );
}