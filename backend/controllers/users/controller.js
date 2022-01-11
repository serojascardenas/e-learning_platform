
const User = require('../../models/domain/user');

const getUserByIdAsync = async id => {
	const user = await User.findById(id);
	return user;
};

const createUserAsync = async ({
	name,
	email,
	password,
	bio,
}) => {
	const user = new User({
		name,
		email,
		password,
		bio,
	});

	const savedUser = await user.save();
	return savedUser;
};

const updateUserWishListAsync = async ({
	userId,
	courseId,
}) => {
	const user = await User.findByIdAndUpdate(userId,
		{ $push: { 'wishList': { 'courseId': courseId } } },
		{ safe: true, upsert: true },
	);

	return user.id;
};

const updateUserEnrolledCourseAsync = async ({
	userId,
	courseId,
}) => {
	const user = await User.findByIdAndUpdate(userId,
		{ $push: { 'enrolledCourses': { 'courseId': courseId } } },
		{ safe: true, upsert: true },
	);

	return user.id;
};

module.exports = {
	getUserByIdAsync,
	createUserAsync,
	updateUserWishListAsync,
	updateUserEnrolledCourseAsync,
};