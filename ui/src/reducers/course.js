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
	COURSE_TOP_REQUEST,
	COURSE_TOP_FAIL,
	COURSE_TOP_SUCCESS,
	COURSE_INSTRUCTOR_LIST_REQUEST,
	COURSE_INSTRUCTOR_LIST_FAIL,
	COURSE_INSTRUCTOR_LIST_SUCCESS,
	COURSE_UPDATE_REQUEST,
	COURSE_UPDATE_FAIL,
	COURSE_UPDATE_SUCCESS,
	COURSE_UPDATE_RESET,
	COURSE_CREATE_REQUEST,
	COURSE_CREATE_FAIL,
	COURSE_CREATE_SUCCESS,
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
		case COURSE_UPDATE_RESET:
			return {}; 
		default:
			return state;
	}
};

const enrolledCoursesReducer = (
	state = {
		courses: [],
	},
	action,
) => {
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

const wishListCoursesReducer = (
	state = {
		courses: [],
	},
	action,
) => {
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

const topRatedCoursesReducer = (
	state = {
		courses: [],
	},
	action,
) => {
	switch (action.type) {
		case COURSE_TOP_REQUEST:
			return {
				loading: true,
				courses: [],
			};
		case COURSE_TOP_SUCCESS:
			return {
				loading: false,
				courses: action.payload,
			};
		case COURSE_TOP_FAIL:
			return {
				loading: false,
				errors: action.payload,
			};
		default:
			return state;
	}
};

const instructorListCouresesReducer = (
	state = {
		courses: [],
	},
	action,
) => {
	switch (action.type) {
		case COURSE_INSTRUCTOR_LIST_REQUEST:
			return {
				loading: true,
			};
		case COURSE_INSTRUCTOR_LIST_FAIL:
			return {
				loading: false,
				errors: action.payload,
			};
		case COURSE_INSTRUCTOR_LIST_SUCCESS:
			return {
				loading: false,
				courses: action.payload,
			};
		default:
			return state;
	}
};

const createCourseReducer = (
	state = {
		courses: [],
	},
	action,
) => {
	switch (action.type) {
		case COURSE_CREATE_REQUEST:
			return {
				loading: true,
				success: false,
			};
		case COURSE_CREATE_FAIL:
			return {
				loading: false,
				success: false,
				errors: action.payload,
			};
		case COURSE_CREATE_SUCCESS:
			return {
				loading: false,
				success: true,
			};
		default:
			return state;
		}
};

const updateCourseReducer = (
	state = {
		courses: [],
	},
	action,
) => {
	switch (action.type) {
		case COURSE_UPDATE_REQUEST:
			return {
				loading: true,
				success: false,
			};
		case COURSE_UPDATE_FAIL:
			return {
				loading: false,
				success: false,
				errors: action.payload,
			};
		case COURSE_UPDATE_SUCCESS:
			return {
				loading: false,
				success: true,
			};
		case COURSE_UPDATE_RESET:
			return {}; 
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
	instructorListCouresesReducer,
	topRatedCoursesReducer,
	updateCourseReducer,
	createCourseReducer,
};
