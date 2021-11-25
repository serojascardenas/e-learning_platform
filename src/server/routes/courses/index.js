module.exports = function coursesRoutes(routes, {
	controllers,
	middlewares,
}) {
	routes.get('/',
		middlewares.validator(),
		(_, res) => {
			const {
				courses: {
					getCourses,
				},
			} = controllers;

			try {
				const courses = getCourses();

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