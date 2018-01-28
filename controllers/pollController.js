const Poll = require('../models/poll')
const User = require('../models/user')
const Option = require('../models/option')
const { body, validationResult } = require('express-validator/check')
const { sanitizeBody } = require('express-validator/filter')

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

exports.poll_detail = function(req, res, next) {
    console.log('getting poll details')
    let options = []
    Poll.findById(req.params.id)
    .populate('Option')
    .exec((err, poll) => {
        if(err) { return next(err) }
        if(poll == null) {
            let err = new Error('Poll not found')
            err.status = 404
            return next(err)
        }
        console.log('retrieving options')
        async.each(poll.options, (optionId, callback) => {
            Option.findById(optionId)
            .exec((err, option) => {
                if(err) { callback(err) }
                options.push(option)
                callback()
            })
        }, err => {
            if(err) { return next(err) }
            poll.options = options
            res.render('poll_detail', { title: 'Poll ' + poll.title, poll: poll })
        })
    })
}

exports.poll_create_get = function(req, res, next) {
    Option.find((err, options) => {
        if(err) return next(err)
        res.render('poll_form', { title: 'Create Poll', options: options })
    })
}

exports.poll_create_post = [
    (req, res, next) => {
        if(!(req.body.options instanceof Array)) {
            if(typeof req.body.options === 'undefined') req.body.options = []
            else req.body.options = new Array(req.body.options)
        }
        next()
    },
    body('title', 'Title must not be empty').isLength({ min: 1 }).trim(),
    sanitizeBody('*').trim().escape(),
    (req, res, next) => {
        const errors = validationResult(req)
        
        let poll = new Poll({
            title: req.body.title,
            description: req.body.description,
            options: req.body.options
        })
        
        if(!errors.isEmpty()) {
            Option.find((err, options) => {
                if(err) return next(err)
                for(let i=0; i<options.length; i++) {
                    if(poll.options.indexOf(options[i]._id) > -1) {
                        options[i].checked = 'true'
                    }
                }
                res.render('poll_form', { title: 'Create Poll', options: options, poll: poll, errors: errors.array() })
            })
            return
        } else {
            poll.save((err) => {
                if(err) return next(err)
                res.redirect(poll.url)
            })
        }
    }
]

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
