import config from '../config';
import { fetchComponentData } from '../utils';
import { get } from '../utils/core';
import { getErrorMessage } from './utils';

import {
	USER_LOGIN_FAIL,
	USER_LOGIN_REQUEST,
	USER_LOGIN_SUCCESS,
	USER_LOGOUT,
	USER_REGISTER_REQUEST,
	USER_REGISTER_SUCCESS,
	USER_REGISTER_FAIL,
} from '../constants';

const login = (email, password) => async dispatch => {
	dispatch({
		type: USER_LOGIN_REQUEST,
	});

	const response = await fetchComponentData({
		endpoint: get(config, 'app.api.routes.login'),
		method: 'post',
		data: {
			email,
			password,
		},
	});

	if (response?.error) {
		dispatch({
			type: USER_LOGIN_FAIL,
			payload: getErrorMessage(response),
		});
		return;
	}
	dispatch({
		type: USER_LOGIN_SUCCESS,
		payload: response.data,
	});
};

export {
	login,
};
