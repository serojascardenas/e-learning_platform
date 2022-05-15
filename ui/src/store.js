import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import {
	userLoginReducer,
	userRegisterReducer,
	userUpdateProfileReducer,
	userDetailsReducer,
	courseListReducer,
	courseFilterReducer,
	cartReducer,
	orderCreateReducer,
	orderPayReducer,
	orderDetailsReducer,
	myOrdersListReducer,
	courseDetailReducer,
	enrolledCoursesReducer,
	wishListCoursesReducer,
	topRatedCoursesReducer,
	instructorListCouresesReducer,
	updateCourseReducer,
	createCourseReducer,
} from './reducers';

const reducers = combineReducers({
	userLogin: userLoginReducer,
	userRegister: userRegisterReducer,
	userUpdateProfile: userUpdateProfileReducer,
	userDetails: userDetailsReducer,
	enrolledCourses: enrolledCoursesReducer,
	wishList: wishListCoursesReducer,
	isntructorList: instructorListCouresesReducer,
	topCourses: topRatedCoursesReducer,
	courseList: courseListReducer,
	courseDetail: courseDetailReducer,
	filteredCourseList: courseFilterReducer,
	cart: cartReducer,
	orderCreate: orderCreateReducer,
	orderDetails: orderDetailsReducer,
	orderPay: orderPayReducer,
	myOrdersList: myOrdersListReducer,
	courseUpdateDetails: updateCourseReducer,
	courseCreateDetails: createCourseReducer,
});

const middleware = [thunk];

// Get initial state from storage if item exists
const cartItemsFromStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [];
const billingAddressFromStorage = localStorage.getItem('billingAddress') ? JSON.parse(localStorage.getItem('billingAddress')) : {};
const paymentMethodFromStorage = localStorage.getItem('paymentMethod') ? JSON.parse(localStorage.getItem('paymentMethod')) : '';
const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;

const initialState = {
	cart: {
		cartItems: cartItemsFromStorage,
		billingAddress: billingAddressFromStorage,
		paymentMethod: paymentMethodFromStorage,
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
