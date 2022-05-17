const User = require('../../models/domain/user');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const bcryptGen = async password => {
	const salt = await bcrypt.genSalt(10);
	return await bcrypt.hash(password, salt);
};

const getUserByIdAsync = async id => {
	const user = await User.findById(id);
	return user;
};

const getUserProfile = async id => {
	const user = await User.findById(id);
	return {
		id: user.id,
		name: user.name,
		lastName: user.lastName,
		isInstructor: user.isInstructor,
	};
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
	if (typeof userData.password != 'undefined' && userData.password !== '')
		userData.password = await bcryptGen(userData.password);

	const updatedUser = await User.findByIdAndUpdate(
		userId,
		userData,
	);
	return updatedUser;
};

const updateUserWishListAsync = async ({
	userId,
	courseId,
}) => {
	const user = await User.findByIdAndUpdate(userId,
		{ $push: { 'wishList': mongoose.Types.ObjectId(courseId) } },
		{ safe: true, upsert: true },
	);

	return user.id;
};

const updateUserEnrolledCourseAsync = async ({
	userId,
	courseId,
}) => {
	const user = await User.findByIdAndUpdate(userId,
		{ $push: { 'enrolledCourses': mongoose.Types.ObjectId(courseId) } },
		{ safe: true, upsert: true },
	);

	return user.id;
};

module.exports = {
	bcryptGen,
	getUserByIdAsync,
	getUserProfile,
	createUserAsync,
	updateUserAsync,
	updateUserWishListAsync,
	updateUserEnrolledCourseAsync,
};