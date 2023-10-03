// routes/auth/login.js

const express = require("express");
const passport = require("passport");
const router = express.Router();

router.get("/login", (req, res) => {
  res.json({ page: "login" });
});

router.post(
  "/login",
  // passport.authenticate('local'),
  (req, res) => {
    console.log('res.body->', req.body)
    res.json({response: req.body});
  }
);

// Logout route
router.get("/logout", (req, res) => {
  // req.logout();
  // res.redirect('/'); // Redirect to the home page after logout
  res.json({ logout: "logout" });
});

module.exports = router;
