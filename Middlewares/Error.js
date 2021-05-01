/* eslint-disable no-unused-vars */
const errorHandler = (err, req, res, next) => {
	const responseMsg = { error: 'ServerError', status: 500 };
	
	switch (err.message) {
	case 'jwt malformed':
	case 'jwt must be provided':
	case 'jwt signature is required':
	case 'invalid signature':
		responseMsg.error = 'UnAuthorized';
		responseMsg.status = 401;
		break;
	case 'jwt expired':
		responseMsg.error = 'TokenTimeout';
		responseMsg.status = 408;
		break;
	case 'jwt not active':
		responseMsg.error = 'TokenInactive';
		responseMsg.status = 406;
		break;
	default:
		break;
	}

	if (err.code === 11000) {
		if (err.keyPattern.username) {
			responseMsg.error = 'DUP_username';
			responseMsg.status = 409;
		} else if (err.keyPattern.email) {
			responseMsg.error = 'DUP_email';
			responseMsg.status = 409;
		}
	}

	res.json(responseMsg);
};

module.exports = {
	errorHandler,
};