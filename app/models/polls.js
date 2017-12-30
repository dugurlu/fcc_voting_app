'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Poll = new Schema({
    title: String,
    description: String,
    author: String,
    options: [{
        description: String,
        votes: Number
    }]
})

module.exports = mongoose.model('Poll', Poll);