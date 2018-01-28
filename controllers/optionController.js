const Option = require('../models/option')
const { body, validationResult } = require('express-validator/check')
const { sanitizeBody } = require('express-validator/filter')

exports.option_list = function(req, res) {
    Option.find()
    .exec((err, list_options) => {
        if(err) {
            return next(err)
        }
        res.render('option_list', { title: 'Options', option_list: list_options })
    })
}

exports.option_detail = function(req, res) {
    res.send('NOT IMPLEMENTED: Option detail: ' + req.params.id)
}

exports.option_create_get = function(req, res) {
    res.render('option_form', { title: 'Create Option' })
};

exports.option_create_post = [
    body('name', 'Option name required').isLength({ min: 1 }).trim(),
    sanitizeBody('name').trim().escape(),
    (req, res, next) => {
        const errors = validationResult(req)
        
        let option = new Option({ name: req.body.name, votes: 0 })
        
        if(!errors.isEmpty()) {
            res.render('option_form', { title: 'Create Option', option: option, errors: errors.array() })
            return;
        } else {
            Option.findOne({ 'name': req.body.name })
            .exec((err, found_option) => {
                if(err) {
                    return next(err)
                }
                if(found_option) {
                    res.redirect(found_option.url)
                } else {
                    option.save((err) => {
                        if(err) {
                            return next(err)
                        }
                        res.redirect(option.url)
                    })
                }
            })
        }
    }
]

exports.option_delete_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Option delete GET')
}

exports.option_delete_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Option delete POST')
}

exports.option_update_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Option update GET')
}

exports.option_update_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Option update POST')
}
