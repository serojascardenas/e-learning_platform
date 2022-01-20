const { validateCourseRequestSchema } = require('../../models/entities');
const upload = require('../../utils/multer');

module.exports = function coursesRoutes(routes, { controllers, middlewares }) {

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
				if (req.query) {
					const { title, instructor, category, sub_category } = req.query;
					data = await getCourseByFilters(title, instructor, category, sub_category);
				} else {
					data = await getAllCourses();
				}
				return res.status(200).validJsonResponse(data);
			} catch (err) {
				return res.status(400).validJsonError(err);
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
		upload.fields([{ name: 'cover_image', maxCount: 1 }, { name: 'cover_movie', maxCount: 1 }]),
		async (req, res) => {
			const body = JSON.parse(req.body.data);
			if (req.files.cover_image) {
				body['cover_image'] = req.files.cover_image[0].path;
			}
			if (req.files.cover_movie) {
				body['cover_movie'] = req.files.cover_movie[0].path;
			}
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
}
