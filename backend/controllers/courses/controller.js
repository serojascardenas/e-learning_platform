const Course = require('../../models/domain/course');
const CourseReview = require('../../models/domain/course_review');

const getAllCourses = async () => {
	const courses = await Course.find()
		.populate('instructors')
		.populate('reviews');
	return courses;
};

const getCourse = async (courseId) => {
	return await Course.findById(courseId)
		.populate('instructors')
		.populate('reviews');
};

const getCourseByFilters = async (
	title,
	instructor,
	category,
	sub_category
) => {
	var filters = {};
	if (title !== undefined && title !== null && title.trim() !== '') {
		filters.title = { $regex: title, $options: 'i' };
	}

	if (
		instructor !== undefined &&
		instructor !== null &&
		instructor.trim() !== ''
	) {
		filters.instructors = {
			$elemMatch: { name: { $regex: instructor, $options: 'i' } },
		};
	}

	if (category !== undefined && category !== null && category.trim() !== '') {
		filters.category = {
			$elemMatch: { name: { $regex: category, $options: 'i' } },
		};
	}

	if (
		sub_category !== undefined &&
		sub_category !== null &&
		sub_category.trim() !== ''
	) {
		filters.sub_category = {
			$elemMatch: { name: { $regex: sub_category, $options: 'i' } },
		};
	}

	return await Course.find(filters)
		.populate('instructors')
		.populate('reviews');
};
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
	content_sections,
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
		content_sections,
	});
	const responseCourse = await course.save();
	return responseCourse;
};

const createReview = async ({ comment, rating, user, course }) => {
	const review = await new CourseReview({
		comment,
		rating,
		user,
		course,
	}).save();

	if (review) {
		Course.findById(review.course.valueOf(), (err, course) => {
			if (course) {
				course.reviews.push(review);
				course.save();
			}
		});
	}
	return review;
};

const deleteCourse = async (courseId) => {
	const course = await Course.findByIdAndDelete(courseId);
	if (course) {
		course.remove();
	}
	return;
};

module.exports = {
	getAllCourses,
	getCourse,
	createCourse,
	createReview,
	deleteCourse,
	getCourseByFilters,
};
