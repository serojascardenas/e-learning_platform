const { validateUserRequestSchema } = require('../../models/entities');

module.exports = function userRoutes(routes, {
	controllers,
	middlewares,
}) {
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