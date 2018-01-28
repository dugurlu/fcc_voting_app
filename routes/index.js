var express = require('express');
var router = express.Router();


module.exports = (passport) => {
  
  function isLoggedIn(req, res, next) {
    return req.isAuthenticated() ? next() : res.redirect('/login')
  }
  
  /* GET home page. */
  router.get('/', isLoggedIn, (req, res, next) => {
    res.redirect('/api')
  });
  
  
  // Login & Logout
  router.get('/login', (req, res, next) => {
    res.render('login')
  })
  router.get('/logout', (req, res, next) => {
    req.logout()
    res.redirect('/')
  })
  
  
  // Authenticate via GitHub
  router.get('/auth/github', passport.authenticate('github'))
  router.get('/auth/github/callback', passport.authenticate('github', {
    successRedirect: '/api',
    failureRedirect: '/login'
  }))
  
  
  // Authenticate via Twitter
  router.get('/auth/twitter', passport.authenticate('twitter'))
  router.get('/auth/twitter/callback', passport.authenticate('twitter', {
    successRedirect: '/api',
    failureRedirect: '/login'
  }))

return router
}
