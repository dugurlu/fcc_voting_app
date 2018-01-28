const User = require('../models/user')
const Poll = require('../models/poll')
const async = require('async')

exports.user_list = function(req, res, next) {
    User.find()
    .populate('Poll')
    .sort([['displayName', 'ascending']])
    .exec((err, users) => {
        if (err) { return next(err) }
        res.render('user_list', {title: 'Registered Users', user_list: users})
    })
}

exports.user_detail = function(req, res, next) {
    let polls = []
    User.findById(req.params.id)
    .populate('Poll')
    .exec(function(err, user) {
        if(err) { return next(err) }
        if(user == null) {
            let err = new Error('User not found')
            err.status = 404
            return next(err)
        }
        
        
        async.each(user.polls, (pollId, callback) => {
            Poll.findById(pollId)
                .exec((err, poll) => {
                    if(err) { callback(err) }
                    polls.push(poll)
                    callback()
                })
        }, err => {
            if(err) { return next(err) }
            user.polls = polls
            res.render('user_detail', {title: 'User ' + user.name, user: user})
        })
    })
}

exports.user_create_get = function(req, res) {
    res.send('NOT IMPLEMENTED: User create GET')
}

exports.user_create_post = function(req, res) {
    res.send('NOT IMPLEMENTED: User create POST')
}

exports.user_delete_get = function(req, res) {
    res.send('NOT IMPLEMENTED: User delete GET')
}

exports.user_delete_post = function(req, res) {
    res.send('NOT IMPLEMENTED: User delete POST')
}

exports.user_update_get = function(req, res) {
    res.send('NOT IMPLEMENTED: User update GET')
}

exports.user_update_post = function(req, res) {
    res.send('NOT IMPLEMENTED: User update POST')
}
