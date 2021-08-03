const Blog = require('../../Models/Blog/Blog');
const User = require('../../Models/User/User');


const add = async (blogData) => {
	const blog = await Blog.create(blogData);
	await User.findByIdAndUpdate(blog.author, { $addToSet: { blogs: blog._id } }).exec();
	return blog;
};

const getAll = (page, count) => {
	const blogs = Blog.find({}, {}, {
		skip: (+page * +count),
		limit: +count,
	}).populate('author', '_id firstname lastname profilePic username')
		.sort({ 'createdAt': -1 })
		.exec();

	return blogs;
};

const getFollowing = async (userId, page, count) => {
	const user = await User.findById(userId).exec();

	const blogs = await Blog.find({ author: { $in: [...user.following, userId] } }, {}, {
		skip: (+page * +count),
		limit: +count,
	}).populate('author', '_id firstname lastname profilePic username')
		.sort({ 'createdAt': -1 })
		.exec();

	return blogs;
};

const getOne = (id) => {
	const blog = Blog.findById(id)
		.populate('author', '_id firstname lastname profilePic username')
		.exec();
	return blog;
};

const getOwn = (id, page, count) => {
	const blogs = Blog.find({ author: id }, {}, {
		skip: (+page * +count),
		limit: +count,
	}).populate('author', '_id firstname lastname profilePic username')
		.sort({ 'createdAt': -1 })
		.exec();

	return blogs;
};

const deleteOne = async (id, userId) => {
	const blog = await Blog.findById(id, { author: 1 }).exec();

	if (blog && blog.author != userId)
		throw new Error('UnAuthorized');

	await User.findByIdAndUpdate(blog.author, { $pull: { blogs: blog._id } }).exec();
	const result = await Blog.findByIdAndDelete(id).exec();

	return result;
};

const edit = async (id, blogData, userId) => {
	const blogAuthor = await Blog.findById(id, { author: 1 }).exec();

	if (blogAuthor && blogAuthor.author != userId)
		throw new Error('UnAuthorized');

	const blog = Blog.findByIdAndUpdate(id, blogData).exec();
	return blog;
};

const like = (id, userId) => {
	const blog = Blog.findByIdAndUpdate(id, { $addToSet: { likers: userId } }).exec();
	return blog;
};

const unlike = (id, userId) => {
	const blog = Blog.findByIdAndUpdate(id, { $pull: { likers: userId } }).exec();
	return blog;
};

const comment = (id, commId) => {
	return Blog.findByIdAndUpdate(id, { $addToSet: { comments: commId } }).exec();
};

const uncomment = (id, commId) => {
	return Blog.findByIdAndUpdate(id, { $pull: { comments: commId } }).exec();
};

module.exports = {
	add,
	getAll,
	getOne,
	deleteOne,
	edit,
	getOwn,
	like,
	unlike,
	comment,
	uncomment,
	getFollowing,
};