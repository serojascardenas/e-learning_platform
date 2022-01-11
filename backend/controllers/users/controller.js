
const User = require('../../models/domain/user');

const getUserByIdAsync = async id => {
	const user = await User.findById(id);
	return user;
};

const createUserAsync = async ({
	name,
	lastName,
	email,
	password,
	bio,
}) => {
	const user = new User({
		name,
		lastName,
		email,
		password,
		bio,
	});

	const savedUser = await user.save();

	return savedUser;
};

module.exports = {
	getUserByIdAsync,
	createUserAsync,
};