const Order = require('../../models/domain/order');

const createOrder = async ({
	user,
	orderItems,
	billingAddress,
	paymentMethod,
	totalPrice,
	taxPrice,
	itemsPrice,
}) => {
	const order = new Order({
		user: user.id,
		orderItems,
		billingAddress,
		paymentMethod,
		taxPrice,
		totalPrice,
		itemsPrice,
	});

	const createdOrder = await order.save();
	return createdOrder;
};

const getOrderById = async orderId => await Order.findById(orderId).populate('user', 'name email');

const updateOrderToPaid = async (order, { id, status, update_time, email_address }) => {
	if (!order) throw new Error('Orden no puede ser nula');

	order.isPaid = true;
	order.paidAt = Date.now();
	order.paymentResult = {
		id,
		status,
		update_time,
		email_address,
	};

	return await order.save();
};

const getMyOrders = async user => {
	if (!user) throw new Error('Usuario no encontrado');
	const orders = await Order.find({ user: user.id });
	return orders;
};



module.exports = {
	createOrder,
	getOrderById,
	updateOrderToPaid,
	getMyOrders,
};