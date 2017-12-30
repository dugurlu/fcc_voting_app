'use strict'

const Poll = require('../models/polls.js')

function PollHandler() {

    this.addPoll = function (req, res) {
		let poll = new Poll();
		poll.title = 'test poll'
		poll.description = 'test click handler'
		poll.author = req.user.displayName
		poll.options = []
		poll.save((err) => {
		    if(err) {
		        console.log(err)
		        res.send(err)
		    } else {
		        res.json(poll)
		    }
		})
	}
    
    this.getPolls = function (req, res) {
        Poll.find().exec((err, polls) => {
            if(err) res.json(err)
            res.json(polls)
        })
    }
    
}

module.exports = PollHandler;
