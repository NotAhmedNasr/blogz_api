const { Schema, model } = require('mongoose');

const commentSchema = new Schema({
	body: {
		type: String,
		required: true,
		maxLength: 500,
	},
	author: {
		type: String,
		ref: 'User',
	},
	imageUrl: String,
},{ timestamps: true });

commentSchema.index({ 'createdAt': 1 });
commentSchema.index({ 'updatedAt': 1 });

const Comment = model('Comment', commentSchema);

module.exports = Comment;