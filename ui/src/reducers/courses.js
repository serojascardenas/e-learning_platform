import {
	COURSE_REQUEST_ALL,
	COURSE_GET_ALL_FAIL,
	COURSE_GET_ALL_SUCCESS,
} from '../constants';

const courseReducer = (state = {}, action) => {
	switch (action.type) {
		case COURSE_REQUEST_ALL:
			return {
				loading: true,
			};
		case COURSE_GET_ALL_FAIL:
			return {
				loading: false,
			};
		case COURSE_GET_ALL_SUCCESS:
			return {
				...state,
				loading: false,
				courses: action.payload,
			};
		default:
			return state;
	}
};

export { courseReducer };

export const selectors = {
	getCourses: ({ courses }) => {
		console.log(courses);
		return courses;
	},
};
