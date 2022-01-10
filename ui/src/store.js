import {
	createStore,
	combineReducers,
	applyMiddleware,
} from 'redux';

import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import {
	userLoginReducer,
} from './reducers';

const reducers = combineReducers({
	userLogin: userLoginReducer,
});

const middleware = [thunk];

const initialState = {
	userLogin: {
		userInfo: null,
	},
};

const store = createStore(
	reducers,
	initialState,
	composeWithDevTools(applyMiddleware(...middleware)),
);

export default store;
