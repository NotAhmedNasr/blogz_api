/* eslint-disable no-useless-escape */
const { Schema, model } = require('mongoose');

const userSchema = new Schema({
	firstname: {
		type: String,
		required: true,
		trim: true,
		match: /^[a-zA-Z]+$/,
		minLength: 2,
		maxLength: 50,
	},
	lastname: {
		type: String,
		required: true,
		trim: true,
		match: /^[a-zA-Z]+$/,
		minLength: 2,
		maxLength: 50,
	},
	username: {
		type: String,
		required: true,
		trim: true,
		match: /^[a-zA-Z0-9]+$/,
		minLength: 2,
		maxLength: 50,
		unique: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
		trim: true,
		match: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
	},
	password: {
		type: String,
		required: true,
		match: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
		maxLength: 50,
	},
	birthDate: Date,
	profilePic: String,
	followers: [{
		type: String,
		ref: 'User'
	}],
	following: [{
		type: String,
		ref: 'User'
	}],
}, { timestamps: true });

userSchema.index({ firstname: 'text', lastname: 'text', username: 'text' },
	{ name: 'user text index', weights: { firstname: 10, lastname: 10, username: 5 } });
userSchema.index({ 'createdAt': 1 });
userSchema.index({ 'updatedAt': 1 });

const User = model('User', userSchema);

module.exports = User;