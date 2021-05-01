const express = require('express');
const { authorize } = require('../../Middlewares/Authorization');

const blogActions = require('../../Controllers/Blog/blog');

const router = express.Router();

router.get('/', async (req, res, next) => {
	const { query } = req;

	try {
		const blogs = await blogActions.getAll(query.page, query.count);
		res.status(200).json(blogs);
	} catch (error) {
		next(error);
	}
});

router.use(authorize);

router.post('/', async (req, res, next) => {
	const { body, userId } = req;

	try {
		const blog = await blogActions.add({...body, author: userId});
		res.status(201).json(blog);
	} catch (error) {
		next(error);
	}
});

router.get('/own', async (req, res, next) => {
	const { query, userId } = req;

	try {
		const blogs = await blogActions.getOwn(userId, query.page, query.count);
		res.status(200).json(blogs);
	} catch (error) {
		next(error);
	}
});

router.get('/:id', async (req, res, next) => {
	const { params } = req;

	try {
		const blog = await blogActions.getOne(params.id);
		res.status(200).json(blog);
	} catch (error) {
		next(error);
	}
});

router.patch('/:id', async (req, res, next) => {
	const { params, body, userId } = req;

	try {
		const blog = await blogActions.edit(params.id, body, userId);
		res.status(200).json(blog);
	} catch (error) {
		next(error);
	}
});

router.delete('/:id', async (req, res, next) => {
	const { params, userId } = req;

	try {
		const result = await blogActions.deleteOne(params.id, userId);
		res.status(200).json(result);
	} catch (error) {
		next(error);
	}
});

router.patch('/like/:id', async (req, res, next) => {
	const { params, userId } = req;
	
	try {
		const result = await blogActions.like(params.id, userId);
		res.json(result);
	} catch (error) {
		next(error);
	}
});

router.patch('/unlike/:id', async (req, res, next) => {
	const { params, userId } = req;
	
	try {
		const result = await blogActions.unlike(params.id, userId);
		res.json(result);
	} catch (error) {
		next(error);
	}
});

module.exports = router;