import { fetchComponentData } from '../utils';
import { get } from '../utils/core';
import { getErrorMessage } from './utils';
import config from '../config';

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
	COURSE_CREATE_REQUEST,
	COURSE_CREATE_FAIL,
	COURSE_CREATE_SUCCESS,
	COURSE_INSTRUCTOR_LIST_REQUEST,
	COURSE_INSTRUCTOR_LIST_FAIL,
	COURSE_INSTRUCTOR_LIST_SUCCESS,
	COURSE_UPDATE_FAIL,
	COURSE_UPDATE_REQUEST,
	COURSE_UPDATE_SUCCESS,
} from '../constants';

const listCourses = (keyword = '') => async dispatch => {
	dispatch({
		type: COURSE_LIST_REQUEST,
	});

	const response = await fetchComponentData({
		endpoint: `${get(config, 'app.api.routes.courses')}?keyword=${keyword}`,
		method: 'get',
	});

	if (response?.error) {
		dispatch({
			type: COURSE_LIST_FAIL,
			payload: getErrorMessage(response),
		});
		return;
	}

	dispatch({
		type: COURSE_LIST_SUCCESS,
		payload: response.data,
	});
};

const listFilterCourses = (filters = null) => async dispatch => {
	const queryParams = {
		...filters,
	};

	dispatch({
		type: COURSE_FILTER_REQUEST,
	});

	const response = await fetchComponentData({
		endpoint: get(config, 'app.api.routes.courses'),
		method: 'get',
		params: queryParams,
	});

	if (response?.error) {
		dispatch({
			type: COURSE_FILTER_FAIL,
			payload: getErrorMessage(response),
		});
		return;
	}

	dispatch({
		type: COURSE_FILTER_SUCCESS,
		payload: response.data,
	});
};

const getCourse = courseId => async dispatch => {
	dispatch({
		type: COURSE_DETAIL_REQUEST,
	});

	const { data } = await fetchComponentData({
		endpoint: get(config, 'app.api.routes.courseById').replace(
			'{id}',
			courseId,
		),
	});

	if (data?.error) {
		dispatch({
			type: COURSE_DETAIL_FAIL,
			payload: getErrorMessage(data),
		});
		return;
	}

	dispatch({
		type: COURSE_DETAIL_SUCCESS,
		payload: data,
	});
};

const getMyEnrolledCourses = () => async dispatch => {
	dispatch({
		type: COURSE_ENROLLED_REQUEST,
	});

	const response = await fetchComponentData({
		endpoint: get(config, 'app.api.routes.me.enrolledCurses'),
		method: 'get',
	});

	if (response?.error) {
		dispatch({
			type: COURSE_ENROLLED_FAIL,
			payload: getErrorMessage(response),
		});
		return;
	}

	dispatch({
		type: COURSE_ENROLLED_SUCCESS,
		payload: response.data,
	});
};

const getMyWishListCourses = () => async dispatch => {
	dispatch({
		type: COURSE_WISHLIST_REQUEST,
	});

	const response = await fetchComponentData({
		endpoint: get(config, 'app.api.routes.me.wishList'),
		method: 'get',
	});

	if (response?.error) {
		dispatch({
			type: COURSE_WISHLIST_FAIL,
			payload: getErrorMessage(response),
		});
		return;
	}

	dispatch({
		type: COURSE_WISHLIST_SUCCESS,
		payload: response.data,
	});
};

const getMyCreatedCourses = () => async dispatch => {
	dispatch({
		type: COURSE_INSTRUCTOR_LIST_REQUEST,
	});

	const response = await fetchComponentData({
		endpoint: get(config, 'app.api.routes.me.instructorList'),
		method: 'get',
	});

	if (response?.error) {
		dispatch({
			type: COURSE_INSTRUCTOR_LIST_FAIL,
			payload: getErrorMessage(response),
		});
		return;
	}

	dispatch({
		type: COURSE_INSTRUCTOR_LIST_SUCCESS,
		payload: response.data,
	});
};

const listTopCourses = () => async dispatch => {
	dispatch({
		type: COURSE_TOP_REQUEST,
	});

	const response = await fetchComponentData({
		endpoint: get(config, 'app.api.routes.topCourses'),
		method: 'get',
	});

	if (response?.error) {
		dispatch({
			type: COURSE_TOP_FAIL,
			payload: getErrorMessage(response),
		});
	}

	dispatch({
		type: COURSE_TOP_SUCCESS,
		payload: response.data,
	});
};

const createCourse = body => async dispatch => {

	dispatch({
		type: COURSE_CREATE_REQUEST,
	});

	const response = await fetchComponentData({
		endpoint: get(config, 'app.api.routes.courses'),
		method: 'post',
		data: body,
		withCredentials: true,
	});

	if (response?.error) {
		dispatch({
			type: COURSE_CREATE_FAIL,
			payload: getErrorMessage(response),
		});
		return;
	}
	const { data } = response;
	dispatch({
		type: COURSE_CREATE_SUCCESS,
		payload: data,
	});
};

const removeCourse = courseId => async dispatch => {
	dispatch({
		type: COURSE_INSTRUCTOR_LIST_REQUEST,
	});

	const response = await fetchComponentData({
		endpoint: get(config, 'app.api.routes.removeCourseById').replace(
			'{id}',
			courseId,
		),
		method: 'delete',
		withCredentials: true,
	});

	if (response?.error) {
		dispatch({
			type: COURSE_CREATE_FAIL,
			payload: getErrorMessage(response),
		});
		return;
	}
};

const updateCourse = (courseId, body) => async dispatch => {

	dispatch({
		type: COURSE_UPDATE_REQUEST,
	});

	const response = await fetchComponentData({
		endpoint: get(config, 'app.api.routes.updateCourse').replace(
			'{id}',
			courseId,
		),
		method: 'put',
		data: body,
		withCredentials: true,
	});

	if (response?.error) {
		dispatch({
			type: COURSE_UPDATE_FAIL,
			payload: getErrorMessage(response),
		});
		return;
	}

	dispatch({
		type: COURSE_UPDATE_SUCCESS,
	});
};

export {
	listCourses,
	listFilterCourses,
	listTopCourses,
	getCourse,
	getMyEnrolledCourses,
	getMyWishListCourses,
	getMyCreatedCourses,
	createCourse,
	removeCourse,
	updateCourse,
};
