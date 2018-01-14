const Poll = require('../models/poll')

exports.index = function(req, res) {
    res.send('NOT IMPLEMENTED: Site Home Page')
}

exports.poll_list = function(req, res) {
    res.send('NOT IMPLEMENTED: Poll list')
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
