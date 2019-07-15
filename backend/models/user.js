const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {type: String},
    email: {type: String, required: true, lowercase: true, unique: true, trim: true, minlength: 3},
    password: {type: String}
}, {
    timestamps: true,
});

userSchema.set('toJSON', {
    transform: function(doc, ret){
        //remove the password property when seralizing doc to JSON
        delete ret.password;
        return ret;
    }
})

module.exports = mongoose.model('User', userSchema);