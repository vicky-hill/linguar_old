const mongoose = require('mongoose');

const WordSchema = new mongoose.Schema({
    foreign: {
        type: String,
        required: true
    },
    native: {
        type: String,
        required: true
    },
    list: {
        type: mongoose.Schema.ObjectId,
        ref: 'List',
        required: true
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    rating: {
        type: Number,
        default: 0
    },
    dueDate: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Word', WordSchema);