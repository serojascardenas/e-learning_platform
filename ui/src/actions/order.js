import { fetchComponentData } from '../utils';
import { get } from '../utils/core';
import config from '../config';

import {
	ORDER_CREATE_REQUEST,
	ORDER_CREATE_SUCCESS,
	ORDER_CREATE_FAIL,
	ORDER_DETAILS_REQUEST,
	ORDER_DETAILS_SUCCESS,
	ORDER_DETAILS_FAIL,
	ORDER_PAY_REQUEST,
	ORDER_PAY_FAIL,
	ORDER_PAY_SUCCESS,
	LIST_MY_ORDERS_REQUEST,
	LIST_MY_ORDERS_SUCCESS,
	LIST_MY_ORDERS_FAIL,
} from '../constants';

import {
	getErrorMessage,
} from './utils';

const createOrder = order => async dispatch => {
	dispatch({
		type: ORDER_CREATE_REQUEST,
	});

	const response = await fetchComponentData({
		endpoint: get(config, 'app.api.routes.createOrder'),
		method: 'post',
		data: order,
		withCredentials: true,
	});

	if (response?.error) {
		dispatch({
			type: ORDER_CREATE_FAIL,
			payload: getErrorMessage(response.error),
		});
		return;
	}

	dispatch({
		type: ORDER_CREATE_SUCCESS,
		payload: response.data,
	});

};

const getOrderDetails = orderId => async dispatch => {
	dispatch({
		type: ORDER_DETAILS_REQUEST,
	});

	const response = await fetchComponentData({
		endpoint: get(config, 'app.api.routes.getOrderDetails').replace('{id}', orderId),
		method: 'get',
		withCredentials: true,
	});

	if (response?.error) {
		dispatch({
			type: ORDER_DETAILS_FAIL,
			payload: getErrorMessage(response.error),
		});
		return;
	}
	dispatch({
		type: ORDER_DETAILS_SUCCESS,
		payload: response.data,
	});
};

const payOrder = (orderId, paymentResult) => async dispatch => {
	dispatch({
		type: ORDER_PAY_REQUEST,
	});

	const response = await fetchComponentData({
		endpoint: get(config, 'app.api.routes.payOrder').replace('{id}', orderId),
		method: 'put',
		data: paymentResult,
		withCredentials: true,
	});

	if (response?.error) {
		dispatch({
			type: ORDER_PAY_FAIL,
			payload: getErrorMessage(response.error),
		});
		return;
	}

	dispatch({
		type: ORDER_PAY_SUCCESS,
		payload: response.data,
	});
};

const myOrdersList = () => async dispatch => {
	dispatch({
		type: LIST_MY_ORDERS_REQUEST,
	});

	const response = await fetchComponentData({
		endpoint: get(config, 'app.api.routes.getMyOrders'),
		method: 'get',
		withCredentials: true,
	});

	if (response?.error) {
		dispatch({
			type: LIST_MY_ORDERS_FAIL,
			payload: getErrorMessage(response.error),
		});
	}

	dispatch({
		type: LIST_MY_ORDERS_SUCCESS,
		payload: response.data,
	});
};

export {
	createOrder,
	getOrderDetails,
	payOrder,
	myOrdersList,
};