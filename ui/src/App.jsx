import React from 'react';
import {
	Route,
	Switch,
	useLocation,
} from 'react-router-dom';

import Navbar from './components/Navbar';
import Home from './pages/Home';

const App = () => {
	const location = useLocation();
	return (
		<>
			<Navbar 
				location={location}
				key={location.pathname}
			/>
			<Switch>
				<Route path="/home" component={Home} />
				<Route path="/" component={Home} />
			</Switch>
		</>
	);
};

export default App;
