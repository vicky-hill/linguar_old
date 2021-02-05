const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 3
    }, 
    languages: {
        type: Array
    },
    foreignLanguage: {
        type: String,
        default: 'Spanish',
        required: true
    }, 
    nativeLanguage: {
        type: String, 
        default: 'English',
        required: true
    }
});


module.exports = mongoose.model('User', UserSchema);