const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    userName: {type: String, required: true},
    displayName: {type: String},
    authId: {type: String},
    polls: [{type: Schema.ObjectId, ref: 'Poll'}]
})

UserSchema
.virtual('name')
.get(function() {
    if (this.displayName !== null) {
        return this.displayName
    }
    return this.userName
})

UserSchema
.virtual('url')
.get(function() {
    return '/api/users/' + this._id
})

module.exports = mongoose.model('User', UserSchema)
