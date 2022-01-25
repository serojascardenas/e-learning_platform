const Order = require('../../models/domain/order');

const createOrderAsync = async ({
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

const getOrderByIdAsync = async orderId => await Order.findById(orderId).populate('user', 'name email');

const updateOrderToPaidAsync = async (order, { id, status, update_time, email_address }) => {
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

const getMyOrdersAsync = async user => {
	if (!user) throw new Error('Usuario no encontrado');
	const orders = await Order.find({ user: user.id });
	return orders;
};



module.exports = {
	createOrderAsync,
	getOrderByIdAsync,
	updateOrderToPaidAsync,
	getMyOrdersAsync,
};