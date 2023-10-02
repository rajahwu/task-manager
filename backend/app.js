require('dotenv').config()

const express = require('express');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session)
const options = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'Eric@123',
    database: 'task_manager'
}

const app = express();

const createError = require('http-errors');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const sessionStore = new MySQLStore(options);

sessionStore.onReady().then(() => {
    // MySQL session store ready for use.
    console.log('MySQLStore ready');
}).catch(error => {
    // Something went wrong.
    console.error(error);
});

app.use(session({
    key: 'session_cookie_name',
    secret: 'session_cookie_secret',
    store: sessionStore,
    resave: false,
    saveUninitialized: false
}));

// app.use(session({
//     secret: 'keyboard cat',
//     resave: false,
//     saveUninitialized: true,
//     cookie: {
//         httpOnly: false,
//         secure: false,
//         maxAge: 1000 * 60 * 60 * 24 * 3,
//         expires: 1000 * 60 * 60 * 24 * 3
//     },
//     store: new MySQLStore(options)
// }));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(
    async (username, password, done) => {
        try {
            // Find the user by username in your database
            const user = await User.findOne({ where: { username } });

            if (!user) {
                return done(null, false, { message: 'Incorrect username.' });
            }

            // Validate the password (you should hash and compare passwords)
            if (!user.validPassword(password)) {
                return done(null, false, { message: 'Incorrect password.' });
            }

            return done(null, user);
        } catch (err) {
            return done(err);
        }
    }
));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findByPk(id);
        done(null, user);
    } catch (err) {
        done(err);
    }
});

const authLoginRoutes = require('./routes/auth/login');
const authRegistrationRoutes = require('./routes/auth/register');
const indexRoutes = require('./routes/index');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(passport.authenticate('session'));

app.use('/auth/login', authLoginRoutes);
app.use('/auth/register', authRegistrationRoutes);
app.use('/', indexRoutes);


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

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


module.exports = app;