// authMiddleware.js

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect('/login'); // Redirect to the login page or send an unauthorized response
  }
  
  module.exports = ensureAuthenticated;
  