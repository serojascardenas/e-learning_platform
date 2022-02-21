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
	USER_UPDATE_REQUEST,
	USER_UPDATE_SUCCESS,
	USER_UPDATE_FAIL,
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

	localStorage.setItem('userInfo', JSON.stringify(response.data));

	dispatch({
		type: USER_LOGIN_SUCCESS,
		payload: response.data,
	});
};

const register = ({
	id,
	name,
	lastName,
	email,
	password,
}) => async dispatch => {
	dispatch({
		type: USER_REGISTER_REQUEST,
	});

	const response = await fetchComponentData({
		endpoint: get(config, 'app.api.routes.register'),
		method: 'post',
		data: {
			name,
			lastName,
			email,
			password,
		},
		withCredentials: true,
	});

	if (response?.error) {
		dispatch({
			type: USER_REGISTER_FAIL,
			payload: getErrorMessage(response),
		});
		return;
	}

	const { data } = response;

	localStorage.setItem('userInfo', JSON.stringify(data));
	dispatch({
		type: USER_REGISTER_SUCCESS,
		payload: data,
	});

	dispatch({
		type: USER_LOGIN_SUCCESS,
		payload: data,
	});
};

const logout = () => async dispatch => {
	const response = await fetchComponentData({
		endpoint: get(config, 'app.api.routes.logout'),
		method: 'post',
		withCredentials: true,
	});

	if (!response?.error) {
		localStorage.removeItem('userInfo');
		dispatch({
			type: USER_LOGOUT,
		});
	}
};

const updateProfile = body => async dispatch => {
	dispatch({
		type: USER_UPDATE_REQUEST,
	});
	const response = await fetchComponentData({
		endpoint: get(config, 'app.api.routes.me.update'),
		method: 'put',
		data: body,
		withCredentials: true,
	});
	if (response?.error) {
		dispatch({
			type: USER_UPDATE_FAIL,
			payload: getErrorMessage(response),
		});
		return;
	}

	const { data } = response;

	localStorage.setItem('userInfo', JSON.stringify(data));
	dispatch({
		type: USER_UPDATE_SUCCESS,
		payload: data,
	});

	dispatch({
		type: USER_UPDATE_SUCCESS,
		payload: data,
	});
};
export {
	login,
	register,
	logout,
	updateProfile,
};
