module.exports = function coursesRoutes(routes, {
	controllers,
	middlewares,
}) {
	routes.get('/',
		middlewares.validator(),
		async (_, res) => {
			const {
				courses: {
					getAllCourses,
				},
			} = controllers;

			try {
				const courses = await getAllCourses()
				return res
					.status(200)
					.validJsonResponse(courses);

			} catch (err) {
				return res
					.status(400)
					.validJsonError(err);
			}
		},
	);

	routes.get('/users/:id',
		middlewares.validator(),
		async (req, res) => {
			const {
				courses: {
					getUserCourses,
				},
			} = controllers;

			try {
				const courses = await getUserCourses(req.params.id)
				return res
					.status(200)
					.validJsonResponse(courses);

			} catch (err) {
				return res
					.status(400)
					.validJsonError(err);
			}
		},
	);

	routes.get('/trends',
		middlewares.validator(),
		async (req, res) => {
			const {
				courses: {
					getTrendCourses,
				},
			} = controllers;

			try {
				const courses = await getTrendCourses(req.params.id)
				return res
					.status(200)
					.validJsonResponse(courses);

			} catch (err) {
				return res
					.status(400)
					.validJsonError(err);
			}
		},
	);

	return routes;
};