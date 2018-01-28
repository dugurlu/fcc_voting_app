const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PollSchema = new Schema({
    title: {type: String, required: true},
    description: {type: String},
    options: [{type: Schema.ObjectId, ref: 'Option'}]
})

PollSchema
.virtual('url')
.get(function() {
    return '/api/polls/' + this._id
})

module.exports = mongoose.model('Poll', PollSchema)
