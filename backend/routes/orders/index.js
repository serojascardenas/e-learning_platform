const ObjectId = require('mongodb').ObjectId;
const { isEmptyArray } = require('../../utils/core');

module.exports = function userRoutes(routes, { controllers, middlewares }) {
	// @desc    Create new order
	// @route   POST api/orders
	// @access  Private
	routes.post(
		'/',
		middlewares.validator(),
		middlewares.login.require,
		async (req, res) => {
			const { body, user } = req;

			const {
				orders: { createOrderAsync },
			} = controllers;

			const {
				orderItems,
				billingAddress,
				paymentMethod,
				totalPrice,
				taxPrice,
				itemsPrice,
			} = body;

			try {
				if (isEmptyArray(orderItems))
					return res
						.status(400)
						.validJsonError(
							'Los cursos ordenados deben contener por lo menos un elemento'
						);

				const order = await createOrderAsync({
					user,
					orderItems,
					billingAddress,
					paymentMethod,
					totalPrice,
					taxPrice,
					itemsPrice,
				});

				return res.status(201).validJsonResponse(order);
			} catch (err) {
				return res.status(400).validJsonError(err);
			}
		}
	);

	// @desc    Get logged in user orders
	// @route   GET api/orders/my-orders
	// @access  Private
	routes.get(
		'/my-orders',
		middlewares.validator(),
		middlewares.login.require,
		async (req, res) => {
			const { user } = req;

			const {
				orders: { getMyOrdersAsync },
			} = controllers;

			try {
				const orders = await getMyOrdersAsync(user);
				return res.status(200).validJsonResponse(orders);
			} catch (err) {
				return res.status(400).validJsonError(err);
			}
		}
	);

	// @desc    Get order by id
	// @route   GET api/orders/:id
	// @access  Private
	routes.get(
		'/:id',
		middlewares.validator(),
		middlewares.login.require,
		async (req, res) => {
			const {
				orders: { getOrderByIdAsync },
			} = controllers;

			const {
				params: { id },
			} = req;

			try {
				const order = await getOrderByIdAsync(id);
				if (order) return res.status(200).validJsonResponse(order);

				return res.status(404).json('Orden no encontrada');
			} catch (err) {
				return res.status(400).validJsonError(err);
			}
		}
	);

	// @desc    Update order to "paid"
	// @route   PUT api/orders/:id/pay
	// @access  Private
	routes.put(
		'/:id/pay',
		middlewares.validator(),
		middlewares.login.require,
		async (req, res) => {
			const {
				orders: {
					getOrderByIdAsync,
					updateOrderToPaidAsync,
					checkoutStripePayment,
				},
				users: { updateUserEnrolledCourseAsync },
			} = controllers;

			let {
				params: { id: orderId },
				body: {
					id,
					status,
					update_time,
					payer: { ...email_address },
				},
				user,
			} = req;

			try {
				const order = await getOrderByIdAsync(orderId);

				if (!order) return res.status(404).json('Orden no encontrada');
				if (order.paymentMethod === 'Stripe') {
					const paymentResponse = await checkoutStripePayment(order, { id });
					if (
						!paymentResponse ||
						(paymentResponse.error && paymentResponse.message)
					) {
						return res.status(404).json(paymentResponse.message);
					} else {
						id = paymentResponse.id;
						status = paymentResponse.status;
						update_time = paymentResponse.created;
						email_address = paymentResponse.receipt_email;
					}
				}

				const updatedOrder = await updateOrderToPaidAsync(order, {
					id,
					status,
					update_time,
					email_address,
				});

				const courseIds = order.orderItems?.map(course =>
					course.courseId.toString()
				);

				// Enroll user in course
				await Promise.all(
					courseIds.map(async courseId => {
						await updateUserEnrolledCourseAsync({
							userId: user.id,
							courseId,
						});
					})
				);

				return res.status(200).validJsonResponse(updatedOrder);
			} catch (err) {
				return res.status(400).validJsonError(err);
			}
		}
	);

	return routes;
};
