import { createStore, combineReducers, applyMiddleware } from 'redux';

import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import {
	userLoginReducer,
	userRegisterReducer,
	courseListReducer,
	courseFilterReducer,
	cartReducer,
} from './reducers';

const reducers = combineReducers({
	userLogin: userLoginReducer,
	userRegister: userRegisterReducer,
	courseList: courseListReducer,
	filteredCourseList: courseFilterReducer,
	cart: cartReducer,
});

const middleware = [thunk];

// Get initial state from storage if item exists
const cartItemsFromStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [];
const billingAddressFromStorage = localStorage.getItem('billingAddress') ? JSON.parce(localStorage.getItem('billingAddress')) : {};
const userInfoFromStorage = localStorage.getItem('userInfo')
	? JSON.parse(localStorage.getItem('userInfo'))
	: null;

const initialState = {
	cart: {
		cartItems: cartItemsFromStorage,
		billingAddress: billingAddressFromStorage,
	},
	userLogin: {
		userInfo: userInfoFromStorage,
	},
};

const store = createStore(
	reducers,
	initialState,
	composeWithDevTools(applyMiddleware(...middleware)),
);

export default store;
