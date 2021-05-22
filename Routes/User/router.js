const express = require('express');
const { generateToken, authorize } = require('../../Middlewares/Authorization');

const userActions = require('../../Controllers/User/user');

const router = express.Router();



router.post('/login', async (req, res, next) => {
	const { body } = req;
	try {
		let user = await userActions.login(body);
		user = await generateToken(user.toJSON());
		res.json(user);
	} catch (error) {
		next(error);
	}
});

router.post('/', async (req, res, next) => {
	const { body } = req;
	try {
		let user = await userActions.add(body);
		user = await generateToken(user.toJSON());
		res.status(201).json(user);
	} catch (error) {
		next(error);
	}
});

router.use(authorize);

router.get('/', async (req, res, next) => {
	const { query } = req;

	try {
		const users = await userActions.getAll(query.page, query.count);
		res.status(200).json(users);
	} catch (error) {
		next(error);
	}
});

router.get('/:id', async (req, res, next) => {
	const { params } = req;

	try {
		const user = await userActions.getOne(params.id);
		res.status(200).json(user);
	} catch (error) {
		next(error);
	}
});

router.patch('/:id', async (req, res, next) => {
	const { params, body } = req;

	try {
		const result = await userActions.edit(params.id, body);
		res.status(200).json(result);
	} catch (error) {
		next(error);
	}
});

router.delete('/:id', async (req, res, next) => {
	const { params } = req;

	try {
		const result = await userActions.deleteOne(params.id);
		res.status(200).json(result);
	} catch (error) {
		next(error);
	}
});

router.patch('/follow/:id', async (req, res, next) => {
	const { params: { id }, userId } = req;

	if (id == userId)
		next(new Error('Conflict_follow'));

	try {
		const result = await userActions.follow(id, userId);
		res.json(result);
	} catch (error) {
		next(error);
	}
});

router.patch('/unfollow/:id', async (req, res, next) => {
	const { params: { id }, userId } = req;

	try {
		const result = await userActions.unfollow(id, userId);
		res.json(result);
	} catch (error) {
		next(error);
	}
});

module.exports = router;