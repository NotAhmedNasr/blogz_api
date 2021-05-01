const express = require('express');
const userRouter = require('./User/router');
const blogRouter = require('./Blog/router');

const router = express.Router();

router.use('/user', userRouter);
router.use('/blog', blogRouter);







module.exports = router;