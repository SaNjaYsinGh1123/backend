const express = require('express');

const router = express.Router();
const auth = require('./auth');
const post = require('./post');
const book = require('./bootstrap');//for bootstrap pvt ltd
const category = require('./category');


router.use('/auth',auth);
router.use('/post',post);
router.use('/Book',book);
router.use('/category',category);

module.exports = router;