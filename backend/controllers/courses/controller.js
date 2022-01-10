const Course = require('../../models/domain/course')

const getAllCourses = async () => {

	const courses = await Course.find()
		.populate('instructors')
		.populate('reviews')
	return courses
}

const getCourse = async courseId => {

	return await Course.findById(courseId)
		.populate('instructors')
		.populate('reviews')
}

const createCourse = async ({
	attributes,
	price,
	title,
	description,
	instructors,
	cover_image,
	cover_movie,
	category,
	sub_category,
	content_sections
}) => {
	const course = new Course({
		attributes,
		price,
		title,
		description,
		instructors,
		cover_image,
		cover_movie,
		category,
		sub_category,
		content_sections
	});
	const responseCourse = await course.save();
	return responseCourse;
};

module.exports = {
	getAllCourses,
	getCourse,
	createCourse,
};