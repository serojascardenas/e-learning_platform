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
	COURSE_ENROLLED_REQUEST,
	COURSE_ENROLLED_SUCCESS, 
	COURSE_ENROLLED_FAIL,
	COURSE_WISHLIST_REQUEST,
	COURSE_WISHLIST_SUCCESS, 
	COURSE_WISHLIST_FAIL,
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

const enrolledCoursesReducer = (state = {}, action) => {
	switch (action.type) {
		case COURSE_ENROLLED_REQUEST:
			return {
				loading: true,
			};
		case COURSE_ENROLLED_FAIL:
			return {
				loading: false,
				errors: action.payload,
			};
		case COURSE_ENROLLED_SUCCESS:
			return {
				loading: false,
				courses: action.payload,
			};
		default:
			return state;
	}
};

const wishListCoursesReducer = (state = {}, action) => {
	switch (action.type) {
		case COURSE_WISHLIST_REQUEST:
			return {
				loading: true,
			};
		case COURSE_WISHLIST_FAIL:
			return {
				loading: false,
				errors: action.payload,
			};
		case COURSE_WISHLIST_SUCCESS:
			return {
				loading: false,
				courses: action.payload,
			};
		default:
			return state;
	}
};
export {
	courseListReducer,
	courseFilterReducer,
	courseDetailReducer,
	enrolledCoursesReducer,
	wishListCoursesReducer, 
};
