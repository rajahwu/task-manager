const express = require('express');
// const db = require('../db/models');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.json({ page: 'index' })
});


module.exports = router;