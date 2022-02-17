
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

const updateUserAsync = async (userId, userData) => {
	const updatedUser = await User.findByIdAndUpdate(
		userId,
		userData,
		{ upsert: true, new: true, runValidators: true });
	return updatedUser;
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
	updateUserAsync,
	updateUserWishListAsync,
	updateUserEnrolledCourseAsync,
};