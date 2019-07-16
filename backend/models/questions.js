const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const questionSchema = new Schema({
    quizId: Schema.Types.ObjectId,
    question: String,
    answers: [{
        answer: String,
        correct: {
            type: Boolean,
            default: false
        }
    }]
});

module.exports = mongoose.model('Question', questionSchema);