const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: 'User',
	},
	orderItems: [{
		courseId: {
			type: String,
			required: true,
		},
		title: {
			type: String,
			required: true,
		},
		cover_image: {
			type: String,
			required: true,
		},
		price: {
			amount: {
				type: Number,
				required: true,
			},
			currency: {
				type: String,
				required: true,
			},
			currency_symbol: {
				type: String,
				required: true,
			},
			price_string: {
				type: String,
			},
			is_free: {
				type: Boolean,
				default: false,
			},
		},
	}],
	billingAddress: {
		address: {
			type: String,
			required: true,
		},
		city: {
			type: String,
			required: true,
		},
		postalCode: {
			type: String,
			required: true,
		},
		country: {
			type: String,
			required: true,
		},
	},
	itemsPrice: {
		type: Number,
		require: true,
		default: 0.0,
	},
	paymentMethod: {
		type: String,
		required: true,
	},
	paymentResult: {
		id: { type: String },
		status: { type: String },
		update_time: { type: String },
		email_address: { type: String },
	},
	taxPrice: {
		type: Number,
		required: true,
		default: 0.0,
	},
	totalPrice: {
		type: Number,
		required: true,
		default: 0.0,
	},
	isPaid: {
		type: Boolean,
		required: true,
		default: false,
	},
	paidAt: {
		type: Date,
	}
}, {
	timestamps: true,
	toJSON: {
		transform: (doc, ret) => {
			ret.id = doc._id;
			delete ret._id;
			delete ret.__v;
		},
	},
});

module.exports = mongoose.model('Order', orderSchema, 'orders');
