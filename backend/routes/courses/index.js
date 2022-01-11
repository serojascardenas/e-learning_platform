const { validateCourseRequestSchema } = require('../../models/entities');

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
				const courses = await getAllCourses();
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

	routes.get('/:id',
		middlewares.validator(),
		async (req, res) => {
			const {
				courses: {
					getCourse,
				},
			} = controllers;

			try {
				const course = await getCourse(req.params.id);
				return res
					.status(200)
					.validJsonResponse(course);

			} catch (err) {
				return res
					.status(400)
					.validJsonError(err);
			}
		},
	);

	routes.post('/',
		middlewares.validator(),
		async (req, res) => {
			const { body } = req;
			const {
				courses: {
					createCourse,
				},
			} = controllers;

			try {
				const { isValid, errors } = validateCourseRequestSchema(body);
				if (!isValid) {
					res.status(400).validJsonResponse(errors);
				}

				const course = await createCourse(body);

				return res
					.status(201)
					.validJsonResponse(course);

			} catch (err) {
				return res
					.status(400)
					.validJsonError(err);
			}
		},
	);

	routes.post('/reviews',
		middlewares.validator(),
		async (req, res) => {
			const { body } = req;
			const {
				courses: {
					createReview,
				},
			} = controllers;

			try {
				const review = await createReview(body);

				return res
					.status(201)
					.validJsonResponse(review);

			} catch (err) {
				return res
					.status(400)
					.validJsonError(err);
			}
		},
	);

	routes.delete('/:id',
		middlewares.validator(),
		async (req, res) => {
			const {
				courses: {
					deleteCourse,
				},
			} = controllers;

			try {
				await deleteCourse(req.params.id);
				return res
					.status(204).send();

			} catch (err) {
				return res
					.status(400)
					.validJsonError(err);
			}
		},
	);
	return routes;
};