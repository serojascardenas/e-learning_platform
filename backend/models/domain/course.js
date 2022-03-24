const mongoose = require('mongoose');
const CourseReview = require('./course_review');

const MIN_LENGTH_PATTERN = /^.{5,}$/;

const schema = new mongoose.Schema({
	created_at: {
		type: Date,
	},
	updated_at: {
		type: Date,
	},
	title: {
		type: String,
		required: 'for title min of 5 letters',
		match: MIN_LENGTH_PATTERN,
	},
	description: {
		type: String,
		required: true,
	},
	instructors: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
	}],
	cover_image: {
		type: String,
		required: true,
	},
	cover_movie: {
		type: String,
	},
	reviews: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'CourseReview',
	}],
	attributes: {
		video_content_length: {
			type: Number,
			default: 0,
		},
		num_articles: {
			type: Number,
			default: 0,
		},
		num_practice_tests: {
			type: Number,
			default: 0,
		},
		has_lifetime_access: {
			type: Boolean,
			default: false,
		},
		has_assignments: {
			type: Boolean,
			default: false,
		},
		has_certificate: {
			type: Boolean,
			default: false,
		},
	},
	number_subscribers: {
		type: Number,
		default: 0,
	},
	category: {
		type: String,
		required: true,
	},
	sub_category: {
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
	content_sections: [{
		_id: false,
		title: {
			type: String,
			required: true,
		},
		order: {
			type: Number,
			required: true,
		},
		items: [{
			_id: false,
			name: {
				type: String,
				required: true,
			},
			order: {
				type: Number,
				required: true,
			},
		}],
	}],
}, {
	timestamps: true,
	toJSON: {
		transform: function (doc, ret) {
			ret.id = doc._id;
			delete ret.__v;
			delete ret._id;
			return ret;
		},
	},
});

schema.pre('save', async function (next) {
	try {
		this.price.price_string = `${this.price.currency_symbol} ${this.price.amount}`;
		next();
	} catch (err) {
		throw new Error(err);
	}
});

schema.post('remove', async function () {
	try {
		//await this.db.model('CourseReview').deleteMany({ course: this._id }).session(this.$session());
		await CourseReview.deleteMany({ course: this._id }).exec();
	} catch (err) {
		throw new Error(err);
	}
});

module.exports = mongoose.model('Course', schema, 'course');