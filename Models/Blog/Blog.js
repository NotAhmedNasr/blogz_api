const { Schema, model } = require('mongoose');

const blogSchema = new Schema({
	title: {
		type: String,
		required: true,
		maxLength: 200,
	},
	body: {
		type: String,
		required: true,
		maxLength: 20000,
	},
	author: {
		type: String,
		ref: 'User',
		index: true,
	},
	imageUrl: String,
	tags: {
		type: [{
			type: String,
			minLength: 2,
			maxLength: 100,
		}],
		index: true
	},
	likers: [{
		type: String,
		ref: 'User',
	}],
	comments: [{
		type: String,
		ref: 'Comment',
	}]
}, { timestamps: true });

blogSchema.index({ title: 'text', body: 'text', tags: 'text' },
	{ name: 'blog text index', weights: { title: 10, body: 7, tags: 5 } });

blogSchema.index({ 'createdAt': 1 });
blogSchema.index({ 'updatedAt': 1 });

const Blog = model('Blog', blogSchema);

module.exports = Blog;