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

	routes.get('/:id/enrolled-courses',
		middlewares.validator(),
		async (req, res) => {
			const {
				users: {
					getUserByIdAsync,
				},
			} = controllers;

			try {
				const user = await getUserByIdAsync(req.params.id);
				return res
					.status(200)
					.validJsonResponse(user.enrolledCourses);

			} catch (err) {
				return res
					.status(400)
					.validJsonError(err);
			}
		},
	);

	routes.get('/:id/wish-list',
		middlewares.validator(),
		async (req, res) => {
			const {
				users: {
					getUserByIdAsync,
				},
			} = controllers;

			try {
				const user = await getUserByIdAsync(req.params.id);
				return res
					.status(200)
					.validJsonResponse(user.wishList);

			} catch (err) {
				return res
					.status(400)
					.validJsonError(err);
			}
		},
	);

	routes.put('/wish-list',
		middlewares.validator(),
		async (req, res) => {
			const { body } = req;
			const {
				users: {
					updateUserWishListAsync,
				},
			} = controllers;

			try {
				const user = await updateUserWishListAsync(body);
				return res
					.status(200)
					.validJsonResponse(user);

			} catch (err) {
				return res
					.status(400)
					.validJsonError(err);
			}
		},
	);

	routes.put('/enrolled-course',
		middlewares.validator(),
		async (req, res) => {
			const { body } = req;
			const {
				users: {
					updateUserEnrolledCourseAsync,
				},
			} = controllers;

			try {
				const user = await updateUserEnrolledCourseAsync(body);
				return res
					.status(200)
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