// routes/auth/register.js

const express = require('express');
const passport = require('passport');
const router = express.Router();
const User = require('../../db/models/user'); // Import your user model

router.get('/register', (req, res) => {
  // Render your registration form
});

router.post('/register', async (req, res) => {
  try {
    // Create a new user record in your database
    const newUser = await User.create({
      username: req.body.username,
      password: req.body.password, // You should hash and salt the password
    });
    // Log in the newly registered user
    req.login(newUser, (err) => {
      if (err) {
        console.error(err);
        return next(err);
      }
      return res.redirect('/dashboard'); // Redirect to the dashboard after registration
    });
  } catch (err) {
    console.error(err);
    // Handle registration error (e.g., duplicate username)
    res.redirect('/register'); // Redirect back to the registration form
  }
});

module.exports = router;
