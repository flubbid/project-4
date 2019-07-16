const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const quizSchema = new Schema({
    name: { type: String, require: true },
    description: String,
    userId: {
        type: Schema.Types.ObjectId
    },
    questions: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Question'
        }
    ]

});



module.exports = mongoose.model('Quiz', quizSchema);