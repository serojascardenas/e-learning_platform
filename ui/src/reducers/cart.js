/* eslint-disable indent */
/* eslint-disable no-case-declarations */
import {
	CART_ADD_ITEM,
	CART_REMOVE_ITEM,
	CART_SAVE_PAYMENT_METHOD,
	CART_SAVE_BILLING_ADDRESS,
	CART_RESET_ITEMS,
} from '../constants';

export const cartReducer = (
	state = {
		cartItems: [],
	},
	action,
) => {
	switch (action.type) {
		case CART_ADD_ITEM:
			const item = action.payload;
			const existItem = state.cartItems.find(x => x.courseId === item.courseId);
			if (existItem) {
				return {
					...state,
					cartItems: state.cartItems.map(x => x.courseId === existItem.courseId ? item : x),
				};
			} else {
				return {
					...state,
					cartItems: [...state.cartItems, item],
				};
			}
		case CART_REMOVE_ITEM:
			return {
				...state,
				cartItems: state.cartItems.filter(x => x.courseId !== action.payload),
			};
		case CART_SAVE_PAYMENT_METHOD:
			return {
				...state,
				paymentMethod: action.payload,
			};
		case CART_SAVE_BILLING_ADDRESS:
			return {
				...state,
				billingAddress: action.payload,
			};
		case CART_RESET_ITEMS:
			return {
				...state,
				cartItems: [],
			};
		default:
			return state;
	}
};