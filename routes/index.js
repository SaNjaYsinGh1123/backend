const express = require('express');

const router = express.Router();
const auth = require('./auth');
const post = require('./post');
const category = require('./category');


router.use('/auth',auth);
router.use('/post',post);
router.use('/category',category);

module.exports = router;