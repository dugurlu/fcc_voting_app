'use strict';

var GitHubStrategy = require('passport-github').Strategy;
const TwitterStrategy = require('passport-twitter').Strategy
var User = require('../models/users');
var configAuth = require('./auth');

module.exports = function (passport) {
	passport.serializeUser(function (user, done) {
		done(null, user.id);
	});

	passport.deserializeUser(function (id, done) {
		User.findById(id, function (err, user) {
			done(err, user);
		});
	});

	// GitHub Authentication
	passport.use(new GitHubStrategy({
		clientID: configAuth.githubAuth.clientID,
		clientSecret: configAuth.githubAuth.clientSecret,
		callbackURL: configAuth.githubAuth.callbackURL
	},
	function (token, refreshToken, profile, done) {
		process.nextTick(function () {
			User.findOne({ 'authId': profile.id }, function (err, user) {
				if (err) {
					return done(err);
				}

				if (user) {
					return done(null, user);
				} else {
					var newUser = new User();

					newUser.authId = profile.id;
					newUser.username = profile.username;
					newUser.displayName = profile.displayName;
					newUser.nbrClicks.clicks = 0;

					newUser.save(function (err) {
						if (err) {
							throw err;
						}

						return done(null, newUser);
					});
				}
			});
		});
	}));
	
	// Twitter Authentication
	passport.use(new TwitterStrategy({
		consumerKey: configAuth.twitterAuth.clientID,
		consumerSecret: configAuth.twitterAuth.clientSecret,
		callbackURL: configAuth.twitterAuth.callbackURL
	},
	function (token, tokenSecret, profile, cb) {
		User.findOne({ 'authId': profile.id }, function (err, user) {
			if (err) {
				return cb(err)
			}
			
			if (user) {
				return cb(null, user)
			} else {
				let newUser = new User();
				newUser.authId = profile.id
				newUser.username = profile.username
				newUser.displayName = profile.displayName
				newUser.nbrClicks.clicks = 0;
				newUser.save((err) => {
					if (err) {
						throw err;
					}
					return cb(null, newUser)
				})
			}
		})
	}))
};
