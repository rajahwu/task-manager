require('dotenv').config()

const createError = require('http-errors');
const express = require('express');
const cookieParser = require('cookie-parser');

const logger = requre('morgan');
const passport = require('passport');
const session = require('express-session');

const MySQLStore = require('connect-mysql')(session)
const options = {
    config: {
        user: 'root',
        passport: 'Eric@123',
        database: 'task_manager'
    }
}

const authRoutes = require('./routes/auth');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: {
      httpOnly: false,
      secure: false,
      maxAge: 1000 * 60 * 60 * 24 * 3,
      expires: 1000 * 60 * 60 * 24 * 3
    },
    store: new MySQLStore(options) 
  }));
  
app.use(passport.authenticate('session'));

app.use('/auth', authRoutes);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});


// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;