const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const validateEmail = email => {
	var re = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
	return re.test(email);
};

const schema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	lastName: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
		validate: [validateEmail, 'Please fill a valid email address'],
		match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
	},
	password: {
		type: String,
		required: true,
	},
	bio: {
		type: String,
	},
	isActive: {
		type: Boolean,
		default: true,
	},
	isInstructor: {
		type: Boolean,
		default: false,
	},
	wishList: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Course',
	}],
	enrolledCourses: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Course',
	}],
	avatar: {
		type: String,
	},
}, {
	timestamps: true,
	toJSON: {
		transform: (doc, ret) => {
			ret.id = doc._id;
			delete ret._id;
			delete ret.__v;
			delete ret.password;
		},
	},
});

schema.pre('save', async function (next) {
	try {
		if (this.isModified('password')) {
			const salt = await bcrypt.genSalt(10);
			const cyphered = await bcrypt.hash(this.password, salt);
			this.password = cyphered;
			next();
		}
	} catch (err) {
		throw new Error(err);
	}
});

schema.methods.checkPassword = async function (password) {
	return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', schema, 'user');