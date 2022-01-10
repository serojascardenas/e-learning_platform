import {
	USER_LOGIN_FAIL,
	USER_LOGIN_REQUEST,
	USER_LOGIN_SUCCESS,
	USER_LOGOUT,
	USER_REGISTER_REQUEST,
	USER_REGISTER_SUCCESS,
	USER_REGISTER_FAIL,
} from '../constants';

const userLoginReducer = (
	state = {},
	action
) => {
	switch (action.type) {
		case USER_LOGIN_REQUEST:
			return {
				loading: true,
			};
		case USER_LOGIN_SUCCESS:
			return {
				loading: false,
				userInfo: action.payload,
			};
		case USER_LOGIN_FAIL:
			return {
				loading: false,
				errors: action.payload,
			};
		case USER_LOGOUT:
			return {};
		default:
			return state;
	}
};

export {
	userLoginReducer,
};
