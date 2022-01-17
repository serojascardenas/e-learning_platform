import { fetchComponentData } from '../utils';
import { get } from '../utils/core';
import { getErrorMessage } from './utils';
import config from '../config';

import {
	COURSE_REQUEST_ALL,
	COURSE_GET_ALL_FAIL,
	COURSE_GET_ALL_SUCCESS,
} from '../constants';

const getCourses = (filters = null) => async (dispatch) => {
	dispatch({
		type: COURSE_REQUEST_ALL,
	});

	let queryParams = filters === null || filters === undefined ? '': `?title=${filters.title}&instructor=${filters.instructor}&category=${filters.category}&sub_category=${filters.sub_category}`;

	const response = await fetchComponentData({
		endpoint: get(config, 'app.api.routes.courses') + queryParams,
		method: 'get',
	});

	console.log('response');
	console.log(response === null ? '' : response.data);
	if (response?.error) {
		dispatch({
			type: COURSE_GET_ALL_FAIL,
			payload: getErrorMessage(response),
		});
		return;
	}

	dispatch({
		type: COURSE_GET_ALL_SUCCESS,
		payload: response.data,
	});

	return response.data;
};

export { getCourses };
