const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const quizSchema = new Schema ({
    name: {type: string, require:true},
    description: String,
    questions: [
        {
            type: Scheme.Types.ObjectID,
            ref: 'Question'
        }
    ]

});



module.exports = mongoose.model('Quiz', quizSchema);