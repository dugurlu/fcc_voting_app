const mongoose = require('mongoose')
const Schema = mongoose.Schema

const OptionSchema = new Schema({
    name: {type: String, required: true},
    votes: {type: Number, required: true}
})

OptionSchema
.virtual('url')
.get(function() {
    return '/api/options/' + this._id
})

module.exports = mongoose.model('Option', OptionSchema)
