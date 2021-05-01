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

const login = async ({username, password}) => {
	const user = await User.findOne({username}).exec();
	if (user)
		if(await user.validatePassword(password))
			return user;
		else
			throw new Error('password');
	else
		throw new Error('username');
};

const follow = async (followedId, followerId) => {
	const follower = await User.findByIdAndUpdate(followerId, {$addToSet: {following: followedId}}).exec();
	const followed = await User.findByIdAndUpdate(followedId, {$addToSet: {followers: followerId}}).exec();

	return { follower, followed };
};

const unfollow = async (followedId, followerId) => {
	const follower = await User.findByIdAndUpdate(followerId, {$pull: {following: followedId}}).exec();
	const followed = await User.findByIdAndUpdate(followedId, {$pull: {followers: followerId}}).exec();

	return { follower, followed };
};

module.exports = {
	add,
	getAll,
	getOne,
	deleteOne,
	edit,
	login,
	follow,
	unfollow,
};