const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const jwt = require('jsonwebtoken');

const JWTMiddleware = (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(500).json({ message: 'You are not authorized.' });
    }

    const { user } = jwt.decode(token);

    if (!user || !user._id) {
        return res.status(500).json({ message: 'You are not authorized.' });
    }

    req.user = user;

    return next();
}

require('dotenv').config();
require('./backend/config/database');

app.use(logger('dev'));
app.use(express.json());
app.use(cors());
app.use(favicon(path.join(__dirname, 'build', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'build')));

app.use('/api/users', require('./backend/routes/api/user'));
app.use('/api/quiz', JWTMiddleware, require('./backend/controllers/quiz'));
app.use('/api/questions', JWTMiddleware, require('./backend/controllers/questions'));

app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const port = process.env.PORT || 3001;

app.listen(port, function () {
    console.log(`Express ap running on port ${port}`)
})