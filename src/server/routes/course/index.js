module.exports = function coursesRoutes(routes, {
	controllers,
	middlewares,
}) {
	routes.get('/',
		middlewares.validator(),
		async (_, res) => {
			const {
				course: {
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

	routes.get('/user/:id',
		middlewares.validator(),
		async (req, res) => {
			const {
				course: {
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

	routes.get('/trend',
		middlewares.validator(),
		async (req, res) => {
			const {
				course: {
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