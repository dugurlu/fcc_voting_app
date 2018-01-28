const GitHubStrategy = require('passport-github').Strategy
const TwitterStrategy = require('passport-twitter').Strategy
const User = require('../models/user')

const setup = (passport) => {
  passport.serializeUser((user, done) => {
    done(null, user.id)
  })
  
  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user)
    })
  })
  
  // GitHub Auth
  passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_KEY,
    clientSecret: process.env.GITHUB_SECRET,
    callbackURL: process.env.GITHUB_CALLBACK
  },
  (token, refreshToken, profile, done) => {
    process.nextTick(() => {
      User.findOne({ 'authId': profile.id }, (err, user) => {
        if(err) { return done(err) }
        if(user) { return done(null, user) }
        
        const newUser = new User()
        newUser.authId = profile.id
        newUser.userName = profile.username;
        newUser.displayName = profile.displayName
        newUser.polls = []
        newUser.save((err) => {
          if(err) { throw err }
          return done(null, newUser)
        })
      })
    })
  }))
  
  // Twitter Auth
  passport.use(new TwitterStrategy({
    consumerKey: process.env.TWITTER_KEY,
    consumerSecret: process.env.TWITTER_SECRET,
    callbackURL: process.env.TWITTER_CALLBACK
  },
  (token, tokenSecret, profile, done) => {
    User.findOne({ 'authId': profile.id }, (err, user) => {
      if(err) { return done(err) }
      if(user) { return done(null, user) }
      
      const newUser = new User()
      newUser.authId = profile.id
      newUser.userName = profile.username
      newUser.displayName = profile.displayName
      newUser.save((err) => {
        if(err) { throw err }
        return done(null, newUser)
      })
    })
  }))
}

module.exports = setup