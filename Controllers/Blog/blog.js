const Blog = require('../../Models/Blog/Blog');


const add = (blogData) => {
	const blog = Blog.create(blogData);
	return blog;
};

const getAll = (page, count) => {
	const blogs = Blog.find({}, {}, {
		skip: (+page * +count),
		limit: +count,
	}).exec();

	return blogs;
};

const getOne = (id) => {
	const blog = Blog.findById(id).exec();
	return blog;
};

const getOwn = (id, page, count) => {
	const blogs = Blog.find({author: id}, {}, {
		skip: (+page * +count),
		limit: +count,
	}).exec();

	return blogs;
};

const deleteOne = (id) => {
	const result = Blog.findByIdAndDelete(id).exec();
	return result;
};

const edit = (id, blogData) => {
	const blog = Blog.findByIdAndUpdate(id, blogData).exec();
	return blog;
};


module.exports = {
	add,
	getAll,
	getOne,
	deleteOne,
	edit,
	getOwn,
};