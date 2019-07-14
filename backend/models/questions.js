const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const questionSchema = new Schema ({
    text: {type: String, required: true},
    answer: {type: String},
    choices: {type: [String], required: true}
    });

module.exports = mongoose.model('Question', questionSchema);