const Course = require('../../models/domain/course');
const CourseReview = require('../../models/domain/course_review');
const User = require('../../models/domain/user');

const getAllCourses = async () => {
	const courses = await Course.find()
		.populate('instructors')
		.populate('reviews');
	return courses;
};

const getCourseById = async courseId => {
	let course = await Course.findById(courseId)
		.populate('instructors')
		.populate('reviews');
	let _reviews = await Promise.all(
		course.reviews.map(async review => {
			let user = await User.findById(review.user).exec();
			return {
				_id: review._id,
				comment: review.comment,
				rating: review.rating,
				user: review.user,
				userName: user.name,
				createdAt: review.createdAt,
			};
		})
	);

	let _course = {
		title: course.title,
		description: course.description,
		instructors: course.instructors,
		price: course.price,
		cover_image: course.cover_image,
		number_subscribers: course.number_subscribers,
		content_sections: course.content_sections,
		reviews: _reviews,
		category: course.category,
		sub_category: course.sub_category,
		attributes: course.attributes,
		createdAt: course.createdAt,
		updatedAt: course.updatedAt,
	};

	return _course;
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

const deleteCourse = async courseId => {
	const course = await Course.findByIdAndDelete(courseId);
	if (course) {
		course.remove();
	}
	return;
};

module.exports = {
	getAllCourses,
	getCourseById,
	createCourse,
	createReview,
	deleteCourse,
	getCourseByFilters,
};
