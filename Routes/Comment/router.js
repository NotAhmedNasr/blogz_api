const express = require('express');
const { authorize } = require('../../Middlewares/Authorization');

const commActions = require('../../Controllers/Comment/comment');
const blogActions = require('../../Controllers/Blog/blog');

const router = express.Router();

router.use(authorize);

// id ==> blog id
router.get('/:id', async (req, res, next) => {
	const { query, params: { id } } = req;

	try {
		const comments = await commActions.get(id, query.page, query.count);
		res.status(200).json(comments);
	} catch (error) {
		console.log(error);
		next(error);
	}
});

// id ==> blog id
router.post('/:id', async (req, res, next) => {
	const { body, userId, params: { id } } = req;

	try {
		const comment = await commActions.add({ ...body, author: userId, blog: id });
		if (comment)
			await blogActions.comment(id, comment._id);

		res.status(201).json(comment);
	} catch (error) {
		next(error);
	}
});

router.patch('/:id', async (req, res, next) => {
	const { params, body, userId } = req;

	try {
		const comment = await commActions.edit(params.id, body, userId);
		res.status(200).json(comment);
	} catch (error) {
		next(error);
	}
});

router.delete('/:id', async (req, res, next) => {
	const { params, userId } = req;

	try {
		const result = await commActions.deleteOne(params.id, userId);
		if (result)
			await blogActions.uncomment(result.blog, params.id);

		res.status(200).json(result);
	} catch (error) {
		next(error);
	}
});

module.exports = router;