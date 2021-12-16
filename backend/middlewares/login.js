const User = require('../models/domain/user');

module.exports = {
	require: async function loginRequiredMiddleware(req, res, next) {
		const loginError = new Error('User is not logged in');

		loginError.response = {
			status: 401,
		};

		const {
			session: {
				userId,
			},
		} = req;

		if (typeof res.validJsonError !== 'function') {
			console.error('Error: `validJsonError` is not a function. Be sure to include `validator` middleware before this one');

			return res.status(500).end();
		}

		if (!userId) return res.validJsonError(loginError);

		try {
			const user = await User.findById(userId);

			if (!user) return res.validJsonError(loginError);

			req.user = user;
			return next();
		}
		catch (err) {
			console.error('User not found, destroying session');
			return req.session.destroy(cacheErr => {
				if (cacheErr) {
					console.warn('⚠️ Error destroying session!');
					console.trace(cacheErr);
				}
				res.validJsonError(loginError);
			});
		}
	},
};