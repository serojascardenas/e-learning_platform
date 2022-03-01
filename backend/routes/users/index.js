const { validateUserRequestSchema } = require('../../models/entities');
const get = require('lodash/get');
const upload = require('../../utils/multer');

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
				req.session.userId = get(user, 'id');

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

	routes.put('/',
		middlewares.validator(),
		middlewares.login.require,
		upload.fields([
			{ name: 'file_avatar', maxCount: 1 },
		]),
		async (req, res) => {
			const body = JSON.parse(req.body.body);
			if (req.files.file_avatar) {
				body['avatar'] = req.files.file_avatar[0].path;
			}
			const {
				users: {
					updateUserAsync,
				},
			} = controllers;

			try {
				const user = await updateUserAsync(req.user.id, body);
				return res
					.status(204)
					.validJsonResponse(user);

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