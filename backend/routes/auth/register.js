// routes/auth/register.js

const express = require('express');
const passport = require('passport');
const router = express.Router();
const { User } = require('../../db/models'); // Import your user model


// console.log('db', db)

router.get('/register', (req, res) => {
  // Render your registration form
  res.json({ page: 'registration' })
});

router.post('/register', async (req, res) => {
  try {
    // Create a new user record in your database
    const newUser = await User.create({
      username: req.body.username,
      email: req.body.email,
      hashedPassword: req.body.password, 
    });
    console.log("newUser", newUser)
    if(!newUser) return new Error('unable to create new user');
    // Log in the newly registered user
    // req.login(newUser, (err) => {
    //   if (err) {
    //     console.error(err);
    //     return next(err);
    //   }
    // });
    return res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error(err);
    // Handle registration error (e.g., duplicate username)
    return res.status(500).json({ error: 'Registration failed' });
  }
});

module.exports = router;
