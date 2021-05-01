const express = require('express');

const userActions = require('../../Controllers/User/user');

const router = express.Router();

router.get('/', async (req, res) => {
	const {query} = req;

	try {
		const users = await userActions.getAll(query.page, query.count);
		res.status(200).json(users);
	} catch (error) {
		res.status(400).json(error);
	}
});

router.get('/:id', async (req, res) => {
	const {params} = req;

	try {
		const user = await userActions.getOne(params.id);
		res.status(200).json(user);
	} catch (error) {
		res.status(400).json(error);
	}
});

router.post('/', async (req, res) => {
	const { body } = req;
	try {
		const user = await userActions.add(body);
		res.status(201).json(user);
	} catch (error) {
		res.status(400).json(error);
	}
});

router.patch('/:id', async (req, res) => {
	const {params, body} = req;

	try {
		const result = await userActions.edit(params.id, body);
		res.status(200).json(result);
	} catch (error) {
		res.status(400).json(error);
	}
});

router.delete('/:id', async (req, res) => {
	const {params} = req;

	try {
		const result = await userActions.deleteOne(params.id);
		res.status(200).json(result);
	} catch (error) {
		res.status(400).json(error);
	}
});

module.exports = router;