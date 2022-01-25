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
} from '../constants';

const listCourses = () => async dispatch => {
	dispatch({
		type: COURSE_LIST_REQUEST,
	});

	const response = await fetchComponentData({
		endpoint: get(config, 'app.api.routes.courses'),
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
			courseId
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

export { listCourses, listFilterCourses, getCourse };
