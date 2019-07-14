const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const quizRoutes = express.Router()
const app = express();

let Quiz = require('./backend/models/quiz')

require('dotenv').config();
require('./backend/config/database')

app.use(logger('dev'));
app.use(express.json());
app.use(cors());
app.use(favicon(path.join(__dirname, 'build', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'build')));
app.use('/api/users', require('./backend/routes/api/user'))


quizRoutes.route('/').get(function(req,res){
    Quiz.find(function(err, quizs){
        if(err){
            console.log(err);
        } else {
            res.json(quizs)
        }
    })
})

quizRoutes.route(':/id').get(function(req,res){
    let id = req.params.id
    Quiz.findById(id, function(req, res){
        res.json(quiz)
    })
})

quizRoutes.route('/add').post(function(req, res){
    let quiz = new Quiz(req.body)
    quiz.save()
        .then(quiz => {
            res.status(200).json({'quiz': 'quiz added succesfully'})
        })
    .catch(err => {
        res.status(400).send('adding a quiz failed')
    });
});

quizRoutes.route('/update/:id').post(function(req, res){
    Quiz.findById(req.params.id, function(err, quiz){
        if(!quiz){
            res.status(404).send('data is not found')
        } else {
            quiz.quiz_name = req.body.quiz_name;
            quiz.quiz_description = req.body.quiz_description;

        quiz.save().then(quiz => {
            res,json('Quiz Updated');
        })
        .catch(err => {
            res.status(400).send("update not posisble")
        })
        }
    })
})

app.use('/quiz', quizRoutes)

const connection = mongoose.connection;

connection.once('open', () => {
    console.log('MongoDB connected');
})
//Put any API routes here before the "catch all" route!

app.get('/*', function(req,res){
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});


const port = process.env.PORT || 3001;

app.listen(port, function(){
    console.log(`Express ap running on port ${port}`)
})