const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PollSchema = new Schema({
    title: {type: String, required: true},
    description: {type: String},
    author: {type: Schema.ObjectId, ref: 'User', required: true},
    options: [{type: Schema.ObjectId, ref: 'Option'}]
})

PollSchema
.virtual('url')
.get(() => {
    return '/api/polls/' + this._id
})

module.exports = mongoose.model('Poll', PollSchema)
