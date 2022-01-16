import { fetchComponentData } from '../utils';
import { get } from '../utils/core';
import { getErrorMessage } from './utils';
import config from '../config';

import {
	COURSE_REQUEST_ALL,
	COURSE_GET_ALL_FAIL,
	COURSE_GET_ALL_SUCCESS,
} from '../constants';

const getAllCourses = () => async (dispatch) => {
	dispatch({
		type: COURSE_REQUEST_ALL,
	});

	const response = await fetchComponentData({
		endpoint: get(config, 'app.api.routes.courses'),
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

export { getAllCourses };

