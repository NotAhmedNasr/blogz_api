const { promisify } = require('util');
const jwt = require('jsonwebtoken');

const signAsync = promisify(jwt.sign);
const verifyAsync = promisify(jwt.verify);

const generateToken = async (user) => {
	const token = await signAsync({
		data: {
			id: user._id,
		}
	}, 'secret', { expiresIn: '1h' });

	return {...user, token};
};

const authorize = async (req, res, next) => {
	const { authorization } = req.headers;
	try {
		const payload = await verifyAsync(authorization, 'secret');
		req.userId = payload.data.id;
		next();
	} catch (error) {
		console.log(error.message);
		next(error);
	}
};

module.exports = {
	generateToken,
	authorize,
};