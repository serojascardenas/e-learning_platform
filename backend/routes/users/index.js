const { validateUserRequestSchema } = require('../../models/entities');

module.exports = function userRoutes(routes, {
	controllers,
	middlewares,
}) {

	routes.get('/me',
		middlewares.validator(),
		middlewares.login.require,
		(req, res) => {
			const { user } = req;
			return res.status(200).validJsonResponse(user);
		},
	);

	routes.post('/',
		middlewares.validator(),
		async (req, res) => {
			const { body } = req;

			const {
				users: {
					createUserAsync,
				},
			} = controllers;

			try {

				const { isValid, errors } = validateUserRequestSchema(body);

				if (!isValid) {
					res.status(400).validJsonResponse(errors);
				}

				const user = await createUserAsync(body);

				return res
					.status(201)
					.validJsonResponse(user);

			} catch (err) {
				return res
					.status(400)
					.validJsonError(err);
			}
		},
	);

	return routes;
};