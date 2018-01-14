#! /usr/bin/env node

console.log('This script populates some test books, authors, genres and bookinstances to your database. Specified database as argument - e.g.: populatedb mongodb://your_username:your_password@your_dabase_url');

//Get arguments passed on command line
const userArgs = process.argv.slice(2);
if (!userArgs[0].startsWith('mongodb://')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}


const async = require('async')
const User = require('./models/user')
const Poll = require('./models/poll')
const Option = require('./models/option')


const mongoose = require('mongoose');
const mongoDB = userArgs[0];
mongoose.connect(mongoDB, {
  useMongoClient: true
});
mongoose.Promise = global.Promise;
const db = mongoose.connection;
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

const users = []
const polls = []
const options = []

function userCreate(username, displayname, authid, cb) {
    let userData = {userName: username, authId: authid}
    if(displayname != false) userData.displayName = displayname
    
    let user = new User(userData)
    
    user.save((err) => {
        if(err) {
            cb(err, null)
            return
        }
        console.log('New User:', user)
        users.push(user)
        cb(null, user)
    })
}

function optionCreate(name, votes, cb) {
    let option = new Option({name: name, votes: votes})
    
    option.save((err) => {
        if(err) {
            cb(err, null)
            return
        }
        console.log('New option:', option)
        options.push(option)
        cb(null, option)
    })
}

function pollCreate(title, description, author, options, cb) {
    let pollData = {title: title, author: author}
    if(description != false) pollData.description = description
    if(options != false) pollData.options = options
    
    let poll = new Poll(pollData)
    poll.save((err) => {
        if(err) {
            cb(err, null)
            return
        }
        console.log('New Poll:', poll)
        polls.push(poll)
        cb(null, poll)
    })
}

function createOptionUsers(cb) {
    async.parallel([
        (callback) => {userCreate('deniz', 'doublesoul', '1337', callback)},
        (callback) => {userCreate('foobar', false, '42', callback)},
        (callback) => {userCreate('anon', false, '0', callback)},
        (callback) => {optionCreate('option1', 0, callback)},
        (callback) => {optionCreate('option2', 0, callback)},
        (callback) => {optionCreate('yes', 0, callback)},
        (callback) => {optionCreate('no', 0, callback)}
    ],
    cb)
}

function createPolls(cb) {
    async.parallel([
        (callback) => {pollCreate('Test Poll 1', false, users[0], [options[0], options[1]], callback)},
        (callback) => {pollCreate('Test Poll 2', 'whatever', users[2], [options[2], options[3]], callback)}
    ],
    cb)
}

async.series([
    createOptionUsers,
    createPolls
],
(err, results) => {
    if(err) {
        console.log('FINAL ERR:', err)
    } else {
        console.log('Polls:', polls)
    }
    mongoose.connection.close()
})