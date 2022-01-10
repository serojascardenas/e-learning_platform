import React from 'react';
import {
	Route,
	Switch,
	useLocation,
} from 'react-router-dom';
import { Provider as StoreProvider } from 'react-redux';

import Navbar from './components/Navbar';

import Home from './pages/Home';
import Login from './pages/Login';

import store from './store';

const App = () => {
	const location = useLocation();
	return (
		<StoreProvider store={store}>
			<Navbar 
				location={location}
				key={location.pathname}
			/>
			<Switch>
				<Route path="/home" component={Home} />
				<Route path="/login" component={Login}/>
				<Route path="/" component={Home} />
			</Switch>
		</StoreProvider>
	);
};

export default App;
