const validateUserRequestSchema = require('./create-user-request');
const validateLoginRequestSchema = require('./login-request');

const validateCourseRequestSchema = require('./create-course-request');
module.exports = {
	validateUserRequestSchema,
	validateLoginRequestSchema,
	validateCourseRequestSchema,
};
