const mongoose = require('mongoose');
const Scheme = mongoose.Schema;

const questionSchema = new Schema ({
    text: {type: String, required: true}.
    answer: String,
    choices: {type: [String], required: true}
    });

module.exports = mongoose.model('Question', questionSchema);