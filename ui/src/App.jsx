import React from 'react';
import {
	Route,
	Switch,
} from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import { GlobalStyles } from './components/Foundation';
import Navbar from './components/Navbar';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';

import theme from './theme';

const App = () => {
	
	return (
		<Router>
			<ThemeProvider theme={theme}>
				<GlobalStyles />
				<Navbar />
				<Switch>
					<main>
						<Container fluid>
							<Route path="/login" component={Login}/>
							<Route path="/register" component={Register} />
							<Route path="/" exact component={Home} />
						</Container>
					</main>
				</Switch>
			</ThemeProvider>
		</Router>
	);
};

export default App;
