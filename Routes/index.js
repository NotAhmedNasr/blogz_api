const express = require('express');

const userRouter = require('./User/router');
const blogRouter = require('./Blog/router');
const commentRouter = require('./Comment/router');

const router = express.Router();

router.use('/user', userRouter);
router.use('/blog', blogRouter);
router.use('/comment', commentRouter);

module.exports = router;