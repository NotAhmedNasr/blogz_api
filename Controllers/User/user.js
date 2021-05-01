const User = require('../../Models/User/User');


const add = (userData) => {
	const user = User.create(userData);
	return user;
};

const getAll = (page, count) => {
	const users = User.find({}, {}, {
		skip: (+page * +count),
		limit: +count,
	}).exec();

	return users;
};

const getOne = (id) => {
	const user = User.findById(id).exec();
	return user;
};

const deleteOne = (id) => {
	const result = User.findByIdAndDelete(id).exec();
	return result;
};

const edit = (id, userData) => {
	const user = User.findByIdAndUpdate(id, userData).exec();
	return user;
};

module.exports = {
	add,
	getAll,
	getOne,
	deleteOne,
	edit,
};