const { validateCourseRequestSchema } = require('../../models/entities');
const upload = require('../../utils/multer');

module.exports = function coursesRoutes(routes, {
	controllers,
	middlewares,
}) {
	routes.get('/',
		middlewares.validator(),
		async (req, res) => {
			const {
				courses: {
					getAllCourses,
					getCourseByFilters,
				},
			} = controllers;

			try {
				let data = [];

				if (req.query && !req.query.keyword) {
					const { title, instructor, category, sub_category } = req.query;
					data = await getCourseByFilters({
						title,
						instructor,
						category,
						sub_category,
					});
				} else {
					data = await getAllCourses(req.query.keyword);
				}
				return res.status(200).validJsonResponse(data);
			} catch (err) {
				return res.status(400).validJsonError(err);
			}
		});

	routes.get('/top',
		middlewares.validator(),
		async (req, res) => {
			const {
				courses: {
					getTopCourses,
				},
			} = controllers;

			try {
				const courses = await getTopCourses();
				return res.status(200).validJsonResponse(courses);
			} catch (err) {
				return res.status(400).validJsonResponse(err);
			}
		});

	routes.get('/:id',
		middlewares.validator(),
		async (req, res) => {
			const {
				courses: {
					getCourseById,
				},
			} = controllers;

			try {
				const course = await getCourseById(req.params.id);
				return res.status(200).validJsonResponse(course);
			} catch (err) {
				return res.status(400).validJsonError(err);
			}
		});

	routes.post('/',
		middlewares.validator(),
		upload.fields([
			{ name: 'cover_image', maxCount: 1 },
			{ name: 'cover_movie', maxCount: 1 },
		]),
		async (req, res) => {
			const body = JSON.parse(req.body.body);
			if (req.files.cover_image) {
				body['cover_image'] = req.files.cover_image[0].path;
			}
			if (req.files.cover_movie) {
				body['cover_movie'] = req.files.cover_movie[0].path;
			}
			const {
				courses: { createCourse },
			} = controllers;

			try {
				const { isValid, errors } = validateCourseRequestSchema(body);
				if (!isValid) {
					return res.status(400).validJsonResponse(errors);
				}
				const course = await createCourse(body);

				return res.status(201).validJsonResponse(course);
			} catch (err) {
				return res.status(400).validJsonError(err);
			}
		},
	);

	routes.post('/reviews', middlewares.validator(), async (req, res) => {
		const { body } = req;
		const {
			courses: { createReview },
		} = controllers;

		try {
			const review = await createReview(body);

			return res.status(201).validJsonResponse(review);
		} catch (err) {
			return res.status(400).validJsonError(err);
		}
	});

	routes.delete('/:id',
		middlewares.validator(),
		async (req, res) => {
			const {
				courses: { deleteCourse },
			} = controllers;

			try {
				await deleteCourse(req.params.id);
				return res.status(204).send();
			} catch (err) {
				return res.status(400).validJsonError(err);
			}
		});

	routes.get('/me/enrolled-courses',
		middlewares.validator(),
		middlewares.login.require,
		async (req, res) => {
			const { user } = req;
			const {
				courses: {
					getCourseByFilters,
				},
			} = controllers;
			try {
				let data = [];
				if (user.enrolledCourses && user.enrolledCourses.length > 0) {
					const ids = user.enrolledCourses.flat(doc => doc.courseId);
					data = await getCourseByFilters({ ids });
				}
				return res.status(200).validJsonResponse(data);
			} catch (err) {
				return res.status(400).validJsonError(err);
			}
		},
	);

	routes.get('/me/wish-list',
		middlewares.validator(),
		middlewares.login.require,
		async (req, res) => {
			const { user } = req;
			const {
				courses: {
					getCourseByFilters,
				},
			} = controllers;

			try {
				let data = [];
				if (user.wishList && user.wishList.length > 0) {
					const ids = user.wishList.flat(doc => doc.courseId);
					data = await getCourseByFilters({ ids });
				}
				return res.status(200).validJsonResponse(data);
			} catch (err) {
				return res.status(400).validJsonError(err);
			}
		},
	);

	routes.get('/me/instructor-list',
		middlewares.validator(),
		middlewares.login.require,
		async (req, res) => {
			const { user } = req;
			const {
				courses: {
					getCoursesByInstructorId,
				},
			} = controllers;

			try {
				const courses = await getCoursesByInstructorId(user.id);
				return res.status(200).validJsonResponse(courses);
			} catch (err) {
				return res.status(400).validJsonError(err);
			}
		},
	);

	routes.put('/:id',
		middlewares.validator(),
		upload.fields([
			{ name: 'cover_image', maxCount: 1 },
			{ name: 'cover_movie', maxCount: 1 },
		]),
		async (req, res) => {
			const courseId = req.params.id;
			const body = JSON.parse(req.body.body);
			if (req.files.cover_image) {
				body['cover_image'] = req.files.cover_image[0].path;
			}
			if (req.files.cover_movie) {
				body['cover_movie'] = req.files.cover_movie[0].path;
			}
			const {
				courses: { updateCourse },
			} = controllers;

			try {
				const course = await updateCourse(courseId, body);
				return res.status(201).validJsonResponse(course);
			} catch (err) {
				return res.status(400).validJsonError(err);
			}
		},
	);
	return routes;
};
