/* eslint-disable indent */
import {
	COURSE_LIST_REQUEST,
	COURSE_LIST_SUCCESS,
	COURSE_LIST_FAIL,
	COURSE_FILTER_REQUEST,
	COURSE_FILTER_SUCCESS,
	COURSE_FILTER_FAIL,
	COURSE_DETAIL_REQUEST,
	COURSE_DETAIL_SUCCESS,
	COURSE_DETAIL_FAIL,
} from '../constants';

const courseListReducer = (state = {}, action) => {
	switch (action.type) {
		case COURSE_LIST_REQUEST:
			return {
				loading: true,
			};
		case COURSE_LIST_FAIL:
			return {
				loading: false,
				errors: action.payload,
			};
		case COURSE_LIST_SUCCESS:
			return {
				loading: false,
				courses: action.payload,
			};
		default:
			return state;
	}
};

const courseFilterReducer = (state = {}, action) => {
	switch (action.type) {
		case COURSE_FILTER_REQUEST:
			return {
				loading: true,
			};
		case COURSE_FILTER_FAIL:
			return {
				loading: false,
				errors: action.payload,
			};
		case COURSE_FILTER_SUCCESS:
			return {
				loading: false,
				filteredCourses: action.payload,
			};
		default:
			return state;
	}
};

const courseDetailReducer = (state = {}, action) => {
	switch (action.type) {
		case COURSE_DETAIL_REQUEST:
			return {
				loading: true,
			};
		case COURSE_DETAIL_FAIL:
			return {
				loading: false,
				errors: action.payload,
			};
		case COURSE_DETAIL_SUCCESS:
			return {
				loading: false,
				course: action.payload,
			};
		default:
			return state;
	}
};

export { courseListReducer, courseFilterReducer, courseDetailReducer };
