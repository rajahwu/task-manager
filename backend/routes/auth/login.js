// routes/auth/login.js

const express = require('express');
const passport = require('passport');
const router = express.Router();

router.get('/login', (req, res) => {
    res.json({ page: 'login' })
});

router.post('/login', passport.authenticate('local', {
    successRedirect: '/dashboard', // Redirect on successful login
    failureRedirect: '/login', // Redirect on failed login
    failureFlash: true // Enable flash messages for failed login
}));

// Logout route
router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/'); // Redirect to the home page after logout
});

module.exports = router;
