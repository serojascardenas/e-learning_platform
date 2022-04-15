const get = require('lodash/get');

const parseErrors = err => {
	let statusCode;
	let data;
	const errors = (Array.isArray(err) ? err : [err])
		.map((error = 'UNKNOWN ERROR') => {
			if (error.response && error.response.status) {
				statusCode = error.response.status;
			}

			if (error instanceof Error) {
				return {
					message: error.toString(),
					stack: error.stack,
				};
			}

			if (typeof error === 'object') {
				const {
					message, errorCode, ...rest
				} = error;
				data = rest;
				let errorResponse = {
					message,
					stack: error.stack,
				};
				if (errorCode) {
					errorResponse = { ...errorResponse, errorCode };
				}
				return errorResponse;
			}
			return { message: error };
		});

	return { errors, statusCode, data };
};

const createValidJsonResponse = ({
	res,
}) => (content, response = {}) => {
	response.statusCode = response.statusCode || res.statusCode || 200;

	if (content.errors) {
		response.errors = content.errors;
		response.data = content.data || {};

		response.statusCode = response.statusCode < 400 ? 500 : response.statusCode;
	} else {
		response.data = content.data || content;
	}
	res.status(response.statusCode).json(response);
};

const createValidJsonError = ({ res }) => err => {
	const { errors, statusCode, data } = parseErrors(err);

	console.error('Error from validator:', ...errors.map(({ message }) => message));
	console.trace(get(err, 'response.data', get(err, 'response', err)));

	res.validJsonResponse({ errors, data }, { statusCode }, true);
};

module.exports = function getValidatorMiddleware() {
	return function validatorMiddleware(req, res, next) {
		res.validJsonResponse = createValidJsonResponse({
			req, res,
		});
		res.validJsonError = createValidJsonError({ res });
		res.errorParser = parseErrors;
		next();
	};
};