const Comment = require('../../Models/Comment/Comment');

const add = (commData) => {
	return Comment.create(commData);
};

const get = (blogId, page, count) => {
	const comments = Comment.find({blog: blogId}, {}, {
		skip: +page * +count,
		limit: +count,
	}).populate({ path: 'author', select: '_id firstname lastname profilePic username' }).exec();

	return comments;
};

const edit = async (id, commData, userId) => {
	const comment = await Comment.findById(id).exec();

	if (comment && comment.author != userId)
		throw new Error('UnAuthorized');

	return Comment.findByIdAndUpdate(id, commData).exec();
};

const deleteOne = async (id, userId) => {
	const comment = await Comment.findById(id).exec();

	if (comment && comment.author != userId)
		throw new Error('UnAuthorized');

	return Comment.findByIdAndDelete(id).exec();
};

module.exports = {
	add,
	get,
	edit,
	deleteOne,
};