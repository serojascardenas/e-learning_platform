
const Course = require('../../models/domain/course')

const getAllCourses = async () => {

	const courses = await Course.find()
		.populate('instructors')
		.populate('reviews')
	return courses
}

const getUserCourses = async (userId) => {

	const courses = await Course.find()
		.populate('instructors')
		.populate('reviews')
	return courses
}

const getTrendCourses = async () => {

	return await Course.find()
		.populate('instructors')
		.populate('reviews')
}

module.exports = {
	getAllCourses,
	getUserCourses,
	getTrendCourses
};