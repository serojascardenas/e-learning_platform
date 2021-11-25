const get = require('lodash/get');
const { validateLoginRequestSchema } = require('../../models/entities');

module.exports = function loginRoutes(routes, {
	controllers,
	middlewares,
}) {
	routes.post('/login',
		middlewares.validator(),
		async (req, res) => {
			const { body } = req;

			const {
				auth: {
					loginUserAsync,
				},
			} = controllers;

			try {
				const { isValid, errors } = validateLoginRequestSchema(body);

				if (!isValid) return res.status(400).validJsonError(errors);

				const user = await loginUserAsync(body);
				req.session.userId = get(user, 'id');

				return res.status(200).validJsonResponse(user);
			} catch (err) {
				return res
					.status(401)
					.validJsonError(err);
			}
		},
	);

	routes.post('/logout',
		middlewares.validator(),
		middlewares.login.require,
		(req, res) => {
			return req.session.destroy(cacheErr => {
				if (cacheErr) {
					console.warn('⚠️ Error destroying session!');
					console.trace(cacheErr);
				}
				return res.status(204).send();
			});
		},
	);

	return routes;
};