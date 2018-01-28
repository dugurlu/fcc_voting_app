const Poll = require('../models/poll')
const User = require('../models/user')
const Option = require('../models/option')

const async = require('async')

exports.index = function(req, res) {
    async.parallel({
        poll_count: (callback) => {
            Poll.count(callback)
        },
        user_count: (callback) => {
            User.count(callback)
        },
        option_count: (callback) => {
            Option.count(callback)
        }
        
    }, (err, results) => {
        res.render('index', { title: 'FCC Poll App Home', error: err, data: results })
    })
}

exports.poll_list = function(req, res, next) {
    Poll.find({})
        .exec((err, list_polls) => {
            if (err) {
                return next(err)
            }
            res.render('poll_list', {title: 'Poll List', poll_list: list_polls})
        })
}

exports.poll_detail = function(req, res) {
    res.send('NOT IMPLEMENTED: Poll detail: ' + req.params.id)
}

exports.poll_create_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Poll create GET')
}

exports.poll_create_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Poll create POST')
}

exports.poll_delete_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Poll delete GET')
}

exports.poll_delete_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Poll delete POST')
}

exports.poll_update_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Poll update GET')
}

exports.poll_update_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Poll update POST')
}
