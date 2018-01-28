const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const bodyParser = require('body-parser');
const passport = require('passport')

const session = require('express-session')
const MongoStore = require('connect-mongo')(session)

const index = require('./routes/index');
const users = require('./routes/users');
const api = require('./routes/api')

require('dotenv').config()

const app = express();

// set up mongoose connection
const mongoose = require('mongoose')
const mongoDb = process.env.MONGO_URI
mongoose.connect(mongoDb, {
  useMongoClient: true
})
mongoose.Promise = global.Promise
const db = mongoose.connection
db.on('error', console.error.bind(console, 'MongoDB connection error'))

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'fcc poll app session secret',
  store: new MongoStore({ mongooseConnection: db, touchAfter: 24 * 3600 }),
  resave: false,
  saveUninitialized: false
}))

// passport authentication middleware
require('./config/passport')(passport)
app.use(passport.initialize())
app.use(passport.session())


app.use('/', index(passport));
app.use('/users', users);
app.use('/api', api)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
