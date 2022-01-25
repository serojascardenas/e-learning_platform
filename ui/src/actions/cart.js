import { fetchComponentData } from '../utils';
import { get } from '../utils/core';
import config from '../config';

import {
	CART_ADD_ITEM,
	CART_REMOVE_ITEM,
	CART_SAVE_BILLING_ADDRESS,
	CART_SAVE_PAYMENT_METHOD,
	CART_RESET_ITEMS,
} from '../constants';

const addToCart = courseId => async (dispatch, getState) => {

	const { data } = await fetchComponentData({
		endpoint: get(config, 'app.api.routes.courseById').replace('{id}', courseId),
	});

	const {
		id,
		description,
		title,
		cover_image,
		price,
		is_free,
	} = data;

	dispatch({
		type: CART_ADD_ITEM,
		payload: {
			courseId: String(id),
			title,
			description,
			cover_image,
			price,
			is_free,
		},
	});

	localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};

const resetCartItems = () => dispatch => {
	dispatch({
		type: CART_RESET_ITEMS,
	});
	localStorage.removeItem('cartItems');
};

const removeFromCart = courseId => async (dispatch, getState) => {
	dispatch({
		type: CART_REMOVE_ITEM,
		payload: courseId,
	});

	localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};

const saveBillingAddress = data => async dispatch => {
	dispatch({
		type: CART_SAVE_BILLING_ADDRESS,
		payload: data,
	});

	localStorage.setItem('billingAddress', JSON.stringify(data));
};

const savePaymentMethod = data => async dispatch => {
	dispatch({
		type: CART_SAVE_PAYMENT_METHOD,
		payload: data,
	});

	localStorage.setItem('paymentMethod', JSON.stringify(data));
};

export {
	addToCart,
	resetCartItems,
	removeFromCart,
	saveBillingAddress,
	savePaymentMethod,
};
